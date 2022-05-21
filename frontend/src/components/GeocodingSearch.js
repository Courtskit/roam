import { useEffect, useRef } from 'react';
import '../styles/geocoder.css';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

/*
 * prop onSearch will be called with arguments (event, searchData) when search is completed
 *  event: event object of search
 *  searchData: JSON returned from mapbox geocodeing API
 */
const Search = (props) => {
  const geocoder = useRef(null);

  useEffect(() => {
    if( geocoder.current ) return;
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      types: 'country,region,place,postcode,locality,neighborhood,poi'
    })

    geocoder.current.addTo('#geocoderContainer');
    geocoder.current.on('result', (e) => {
      props.onSearch && props.onSearch(e, e.result);
    });
  });

  return (
    <div id="geocoderContainer" />
  );
}

export default Search;
