import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
import MapContainer from './MapContainer';

import apiCalls from '../api/apiCalls';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MAP_DEFAULT_CENTER = new mapboxgl.LngLat(-113.02877, 37.297817); //zion national park

const Map = (props) => {
  const mapContainer = useRef(null);
  const mapPopup = useRef(null);
  const map = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if( !map.current ) return;
    console.log('new origin', props.origin);
    map.current.flyTo({ center: props.origin });
    ;
  }, [props.origin]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mswaltek/cl2t1qlnn000e14mq8j5sz8vl',
      center: props.origin || props.marker || MAP_DEFAULT_CENTER,
      zoom: 10.5,
    });

    if(props.loadListings) setupLoadListings();

    mapPopup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.current.on('move', (e) => {
      props.onMove && props.onMove(e, map.current);
    });

    map.current.on('idle', (e) => {
      props.onIdle && props.onIdle(e, map.current);
    });
  })

  useEffect(() => {
    if(!map.current) return;
    if(props.loadListings) loadListings();
    if(props.marker) {
      new mapboxgl.Marker()
        .setLngLat(props.marker)
        .addTo(map.current);
    }
  }, [map, props]);

  const setupLoadListings = () => {
    map.current.on('load', () => {
      map.current.addSource('listings', {
        type: 'geojson',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50,
        data: {
          type: 'FeatureCollection',
          features: [],
        }
      });

      map.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'listings',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
          'circle-radius': [
            'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
          ]
        }
      });

      map.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'listings',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      map.current.addLayer({
          id: 'unclustered-listing',
          type: 'symbol',
          source: 'listings',
        filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': 'listing-marker',
            // get the title name from the sources "title" property
            'text-offset': [0, 1.25],
            'icon-allow-overlap': true,
            'icon-size': 0.25,
          }
      });

      map.current.on('click', 'unclustered-listing', (e) => {
        navigate(`/listing/${e.features[0].properties.id}`);
      });

      map.current.on('mouseenter', 'unclustered-listing', (e) => {
        map.current.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const rating = e.features[0].properties.rating;
        mapPopup.current.setLngLat(coordinates)
          .setHTML(`<h1><strong>${title}</strong></h1> <h2>${rating ? `\n rating ${rating}/5` : '\n no ratings'}<h2>`)
          .addTo(map.current);
        });

      map.current.on('mouseleave', 'unclustered-listing', () => {
        map.current.getCanvas().style.cursor = '';
        mapPopup.current.remove();
      });
    });
  }

  const loadListings = () => {

    apiCalls.getAllListings().then((res) => {
      let features = [];
      for(const listing of res) {
        const feature = {
          "type": "Feature",
          "geometry" : {
            "type": "Point",
            "coordinates": [listing.location_lng, listing.location_lat]
          },
          "properties" : { 'hover': false ,...listing},
        }
        features.push(feature);
      }
      map.current.on('load', () => {
        map.current.getSource('listings').setData({
          "type": "FeatureCollection",
          "features": features
        });
      });
    });
  }

  return (
    <Box w={ props.w || '100%'} h={ props.h || '500px' } ref={mapContainer} className="map-container"/>
  );
};


const MapElement = (props) => <MapContainer element={ <Map {...props} /> } />;
export default MapElement;
