import { Box } from '@chakra-ui/react'

const MapContainer = ({element}) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //develpoment code
    if(!process.env.REACT_APP_MAPBOX_TOKEN) {
      return ( <h1 style={{ color: "red"}}>
        <strong>ERROR!</strong>
        You havent set the REACT_APP_MAPBOX_TOKEN environmental variable for the Map!
        Just add "REACT_APP_MAPBOX_TOKEN=*insert token here* to the .env file at the root of the react project!
        </h1> );
    }
  }
  //production code
  if(!process.env.REACT_APP_MAPBOX_TOKEN) {
    console.err("Wow! Looks like we didnt set the mapbox token!");
    return <div />;
  }
  
  return element;
}

export default MapContainer;
