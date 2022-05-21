import apiCalls from "../api/apiCalls";
import "../styles/ListingPage.css";
import heart from '../static/heart.png';
import emptyHeart from '../static/emptyheart.png';

// needs props user, setUser and listingId
export const FavoriteButton = (props) => {

  const renderFavoriteButton = ()=>{
    let i = props.user.favorite_listings.indexOf(Number(props.listingId))
    if (i > -1){
      return <button id="favorite-button-on" onClick={removeFavorite}><img alt="heart" id='fav-button-icon' src={heart}/></button>
    } else {
      return <button id="favorite-button-on" onClick={addFavorite}><img alt="heart" id='fav-button-icon' src={emptyHeart}/></button>
    }
  }

  const addFavorite = async ()=>{
    let response = await apiCalls.addToFavoriteListings(props.user, props.listingId)
    if (response) {
      props.setUser(response)
    }
  }
  
  const removeFavorite = async ()=>{
    let response = await apiCalls.removeFromFavoriteListings(props.user, props.listingId)
    if (response) {
      props.setUser(response)
    }
  }

  return (
    <>{renderFavoriteButton()}</>  
  );
};

export default FavoriteButton;