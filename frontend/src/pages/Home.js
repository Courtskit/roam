import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Search from "../components/GeocodingSearch";
import MostPopularSites from "../components/MostPopularSites";
import FeaturedParks from "../components/FeaturedParks";
import RandomContent from "../components/RandomContent";
import HeaderImage from "../components/HeaderImage";
import background from "../static/camper.webp";

export const HomePage = (props) => {
  const navigate = useNavigate();

  return (
    <VStack>
      <HeaderImage imageUrl={background} />
      <section className="home-searchbar-section">
        <h1 className="home-searchbar-title">Your next adventure awaits...</h1>
        <form className="home-searchbar-form">
          <Search
            onSearch={(_e, searchData) => {
              navigate(`/listing/search`, {
                state: searchData,
              });
            }}
          />
        </form>
      </section>
      <MostPopularSites user={props.user} setUser={props.setUser} />
      <FeaturedParks />
      <RandomContent />
    </VStack>
  );
};

export default HomePage;
