import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  VStack,
  Box,
  Spinner,
  Button,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import Map from '../components/Map';
import Search from '../components/GeocodingSearch';
import ListingCard from '../components/ListingCard';

const ListingSearch = (props) => {
  let { state } = useLocation();
  let navigate = useNavigate();
  //const [searchRadius, setSearchRadius ] = useState(100);
  const { isOpen, onToggle } = useDisclosure();
  const [origin, setOrigin] = useState(state ? state.center : [-119.5383, 37.8651]);//default to yosemite
  const [listings, setListings] = useState(undefined);

  useEffect(() => {
    //if( listings ) return;
    //apiCalls.getListingsNearPoint(state.center, 50).then((data) => {
    //  setListings(data);
    //});
  });
  
  const populateListingsWithFeatures = async (map) => {
    console.log('loading features');
    const features = map.queryRenderedFeatures({layers: ['unclustered-listing']});
    let viewingListings = [];
    for(const feature of features){
      viewingListings.push(feature.properties);
    }
    if (viewingListings.length >= 1){
      setListings(viewingListings);
    } else {
      setListings(null);
    }
  }

  return (
    <div>
      <Search onSearch={(_e, data) => setOrigin(data.center)}/>
      <Button onClick={onToggle}>{ isOpen ? 'Hide Listings': 'Expand Listings'}</Button>
      <Box
        style={{
          position: 'relative',
        }}
      >
        <Map
          w="100%" h="80vh" loadListings origin={origin}
          onMove={() => setListings(undefined) }
          onIdle={(_e, map) => populateListingsWithFeatures(map)}
        />
        <Slide
          direction='left'
          in={isOpen}
          style={{
            width: 'auto',
            position: 'absolute',
            right: 0,
            zIndex: 5,
            'pointer-events': 'none',
          }}>
            <VStack
              p='15px'
              color='white'
              bg={["primary.900", "primary.900", "primary.900", "primary.900"]}
              maxW='sm'
              h='100%'
              style={{
                'pointer-events': 'auto',
                'overflow-y': 'scroll',
                'overflow-x': 'hidden',
                overflow: 'auto',
              }}
            >
              { listings
                ?
                <span>
                  { listings.map((data) => {
                      console.log(data);
                      return (
                        <Box
                          p='10px'
                        >
                          <ListingCard
                            user={props.user}
                            setUser={props.setUser}
                            key={data.id}
                            name={data.title}
                            price={data.price}
                            listingId={data.id}
                            is_boondock={data.is_boondock}
                            buttonText="View"
                            buttonClick={() => {
                              navigate(`/listing/${data.id}`)
                            }}
                          />
                        </Box>
                          )
                    }
                  )}
                </span>
                :
                  listings === undefined 
                  ?
                    <Spinner />
                  :
                  <h1> No listings in this area! </h1>
              }
          </VStack>
        </Slide>
      </Box>
      </div>
  );
}

export default ListingSearch;
