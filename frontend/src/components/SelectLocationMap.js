import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react'
import MapContainer from './MapContainer.js';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const MAP_DEFAULT_CENTER = new mapboxgl.LngLat(-113.028770, 37.297817);//zion national park

/*
 * map prop onChange will be called with arguments (event, newLngLat) when pin is updated
 *  event: event object of click
 *  newLngLat: mapboxgl.LngLat object
 *     can extract Lng and Lat with `const [lng, lat] = newLngLat
 */
const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return;// initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: MAP_DEFAULT_CENTER,
      zoom: 10.5
    });

    map.current.on('style.load', function() {
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,

          zoom: 10.5,
          marker: false,
        })
      );

      map.current.on('click', function(event) {
        const newLngLat = event.lngLat;
        if(!marker.current) {
          marker.current = new mapboxgl.Marker({
            draggable: true
          }).setLngLat(newLngLat)
            .addTo(map.current);
          marker.current.on('dragend', (event) => props.onChange(event.lngLat));
        }else {
          marker.current.setLngLat(newLngLat);
        }
        props.onChange(event, newLngLat);
      });
    });
  });

  return (
    <Box>
      <Box ref={mapContainer} h='400px' w='500px'/>
    </Box>
  );
};

const MapElement = (props) => <MapContainer element={ <Map {...props} /> } />;
export default MapElement;
