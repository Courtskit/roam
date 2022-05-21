import { useEffect, useState } from "react";
import apiCalls from "../../api/apiCalls";
import React from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import HeadingText from "../../components/HeadingText";
import { Grid, GridItem } from "@chakra-ui/react";

function SavedSites(props) {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user) {
      loadListings();
    }
  }, [props.user]);

  const loadListings = async () => {
    let listingsArray = [];
    for (let i = 0; i < props.user.favorite_listings.length; i++) {
      let response = await apiCalls.getListingById(
        props.user.favorite_listings[i]
      );
      if (response) {
        listingsArray.push(response);
      }
    }
    setListings(listingsArray);
  };

  const renderListings = () => {
    return listings.map((listing) => {
      return (
        <GridItem p={5}>
          <ListingCard
            key={listing.key}
            price={listing.price}
            name={listing.title}
            imageUrl={listing.image}
            buttonText="See Listing"
            buttonClick={() => navigate(`/listing/${listing.id}`)}
          />
        </GridItem>
      );
    });
  };

  return (
    <>
      <HeadingText text="Favorite Sites" />
      <Grid autoRows={"auto"}>{props.user && renderListings()}</Grid>
    </>
  );
}

export default SavedSites;
