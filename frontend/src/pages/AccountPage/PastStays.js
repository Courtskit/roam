import apiCalls from "../../api/apiCalls";
import { useEffect, useState } from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import HeadingText from "../../components/HeadingText";
import PastStaysCard from "../../components/PastStaysCard";
import image from "../../static/branding/listing-default-image.png";

function PastStays(props) {
  const current = new Date();
  const today = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    getPastReservations();
  }, []);

  const getPastReservations = async () => {
    const data = await apiCalls.getAllReservations();
    let pastRes = [];
    if (data) {
      pastRes = data.filter((reservation) => {
        if (new Date(reservation.date_end) < new Date(today)) {
          return reservation;
        }
      });
    }
    setPastReservations(pastRes);
  };

  const loadPastReservations = () => {
    return pastReservations.map((reservation, index) => {
      return (
        <GridItem p={5}>
          <PastStaysCard
            key={reservation.id}
            imageUrl={image}
            name={reservation.listing_name}
            startDate={reservation.date_start}
            endDate={reservation.date_end}
            price={reservation.total}
          />
        </GridItem>
      );
    });
  };

  return (
    <>
      <HeadingText text="Past Stays" />
      <Grid autoRows={"auto"}>{props.user && loadPastReservations()}</Grid>
    </>
  );
}

export default PastStays;
