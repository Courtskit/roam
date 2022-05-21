import { useState, useEffect } from "react";
import apiCalls from "../../api/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { Grid, GridItem, VStack, Button } from "@chakra-ui/react";
import ListingCard from "../../components/ListingCard";
import HeadingText from "../../components/HeadingText";

function MySites(props) {
  const [ownListings, setOwnListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user) {
      loadOwnListings();
    }
  }, [props.user]);

  const loadOwnListings = async () => {
    let listingsArray = [];
    for (let i = 0; i < props.user.owned_listings.length; i++) {
      let response = await apiCalls.getListingById(
        props.user.owned_listings[i]
      );
      if (response) {
        listingsArray.push(response);
      }
    }
    setOwnListings(listingsArray);
  };

  const renderOwnerListings = () => {
    return ownListings.map((listing) => {
      return (
        <GridItem p={5}>
          <ListingCard
            key={listing.key}
            price={listing.price}
            name={listing.title}
            imageUrl={listing.image}
            buttonText="Edit"
            buttonClick={() => navigate(`/listing/${listing.id}/edit`)}
          />
        </GridItem>
      );
    });
  };

  return (
    <VStack pb={10}>
      <HeadingText text="My Listings" />
      <Grid autoRows={"auto"}>{props.user && renderOwnerListings()}</Grid>
      <Link to={`/listing/new`}>
        <Button color="white" bgColor={["primary.900"]}>
          Create New Listing
        </Button>
      </Link>
    </VStack>
  );
}
export default MySites;
