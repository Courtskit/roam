import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import apiCalls from "../api/apiCalls";
import ReservationForm from "../components/ReservationForm";
import "../styles/ListingPage.css";
import { Card, Col, Row } from 'react-bootstrap';
import Map from "../components/Map";
import FavoriteButton from "../components/FavoriteButton";

export const Listing = (props) => {
  const params = useParams()
  let listingId = params.listingId

  const [listing, setListing] = useState(null)

  useEffect(()=>{
    loadListing()
  },[listingId])

  const loadListing = async ()=>{
    let response = await apiCalls.getListingById(listingId)
    if (response){
      setListing(response)
    } 
  }

  return (
    <div className="listing-page">
    { listing ?
      <div className="listing-content">
        <Row>
          <Col className="listing-col1">
            <Card className="listing-card" style={{ width: '400px', height: '600px' }}>
                {
                  (listing.location_lng && listing.location_lat)
                    ? <Map w="400px" h="200px" marker={[listing.location_lng, listing.location_lat]}/>
                    : <span> Location unavailable for this listing </span>
                }
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>
                    {listing.description}
                    <br/>
                    <br/>
                    <img src={listing.image}/>
                  </Card.Text>
                </Card.Body>  
                <Card.Body>
                  {`$${listing.price}/night`}
                  <br/>
                  <br/>
                  { props.user && <FavoriteButton user={props.user} setUser={props.setUser} listingId={listingId}/>}
                </Card.Body>
              </Card>
          </Col>
          <Col className="listing-col2">
            <Card className="listing-card" style={{ width: '400px', height: '600px' }}>
              <Card.Header>Check Availability and Reserve</Card.Header>
              <Card.Body>
                { props.user && <ReservationForm listing={listing} />}
                { !props.user && 'Sign up or log in to reserve this site!'}
              </Card.Body>
            </Card>
          </Col>
          </Row>
        {/* <Row>
          <Col>
            <Card>
              <Card.Header>Reviews</Card.Header>
              <Card.Body>
                Some Reviews Here
              </Card.Body>
            </Card>
          </Col>
        </Row>   */}
      </div>
      :
      <div>
        <h1>Loading...</h1>
      </div>
    }
    </div>
  );
};

export default Listing;