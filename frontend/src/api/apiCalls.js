import axios from "axios";
import apiHelpers from "./apiHelpers";

const apiCalls = {};
const BASE_URL = "http://localhost:8000/api"; //backend in project URLS

//user/auth api methods
apiCalls.signup = async (signupData) => {
  let newUser = await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/users/`, signupData, apiHelpers.getCsrfConfig())
  );
  if (newUser) {
    return await apiCalls.login(signupData);
  }
};

apiCalls.login = async (loginData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/login/`, loginData, apiHelpers.getCsrfConfig())
  );
};

apiCalls.logout = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/logout/`, null, apiHelpers.getCsrfConfig())
  );
};

apiCalls.deleteAccount = async (userId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(`${BASE_URL}/users/${userId}`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.whoAmI = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/whoami/`, apiHelpers.getCsrfConfig())
  );
};

//to add a new listing to favorites, pass in the logged in user(from app state value) and the id of the listing to add
apiCalls.addToFavoriteListings = async (user, newListingId) =>{
  let i = user.favorite_listings.indexOf(Number(newListingId))
  if (i == -1){
    return apiCalls.updateUser(user.id, {'favorite_listings': [...user.favorite_listings, newListingId]})
  } else {
    return null
  }
}

apiCalls.removeFromFavoriteListings = async (user, listingId) =>{
  let i = user.favorite_listings.indexOf(Number(listingId))
  if (i > -1){
    user.favorite_listings.splice(i,1)
    return apiCalls.updateUser(user.id, {'favorite_listings': user.favorite_listings})
  }
  return null
}

apiCalls.updateUser = async (userId, data) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(`${BASE_URL}/users/${userId}/`, data, apiHelpers.getCsrfConfig())
  );
};

//listing methods

// this returns all listings in the database
apiCalls.getAllListings = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/listings/`, apiHelpers.getCsrfConfig())
  );
};

// this will filter listings based on search terms in the search bar
// arguements: to use this you must pass in a string of one or more words separated by spaces. it will clean out any special characters(,./{}....) in case the user passes a string of other characters with the words
// example: apicalls.getListingSearchBar('campsite FL')
apiCalls.getListingsSearchBar = async (str) => {
  let newstr = str.replace(/[^a-zA-Z0-9 ]/g,'')
  let options = apiHelpers.getCsrfConfig()
  options['params']={'filter':'search'}
  let searchStr = newstr.split(' ')
  for (let i=0; i<searchStr.length; i++){
    options['params'][`search${i+1}`]=searchStr[i]
  }
  return await apiHelpers.tryCatchFetch(() => axios.get(`${BASE_URL}/listings/`, options));
};

// this will filter listings and return 10 listings with ratings greater than/equal to a 4 star rating
apiCalls.getListingsPopular = async () => {
  let options = apiHelpers.getCsrfConfig()
  options['params']={'filter':'popular'}
  return await apiHelpers.tryCatchFetch(() => axios.get(`${BASE_URL}/listings/`, options));
};

//this will filter listings by a string passed in which should be all or part of a park name and match it to each listings 'near_park" attribute
apiCalls.getListingsByPark = async (park) => {
  let options = apiHelpers.getCsrfConfig()
  options['params']={'filter':'park'}
  options['params']['park']=park
  return await apiHelpers.tryCatchFetch(() => axios.get(`${BASE_URL}/listings/`, options));
};

apiCalls.getListingsNearPoint = async (point, distance) => {
  let options = apiHelpers.getCsrfConfig()
  options['params']={'filter':'distance'}
  options['params']['point_lng']=point[0]
  options['params']['point_lat']=point[1]
  options['params']['distance']=distance
  return await apiHelpers.tryCatchFetch(() => axios.get(`${BASE_URL}/listings/`, options));
}

apiCalls.createListing = async (listingData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/listings/`, listingData, apiHelpers.getCsrfConfig(), {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    })
  );
};

apiCalls.getListingById = async (listingId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/listings/${listingId}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.updateListingById = async (listingId, listingData) => {
  console.log("csrf: ", apiHelpers.getCsrfConfig());
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/listings/${listingId}/`,
      listingData,
      apiHelpers.getCsrfConfig(),{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      }
    )
  );
};

apiCalls.deleteListingById = async (listingId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(
      `${BASE_URL}/listings/${listingId}/`,
      apiHelpers.getCsrfConfig()
    )
  );
};

// amenities methods
apiCalls.getAllAmenities = async () => {
  console.log("In here");
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/amenities/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.createAmenity = async (amenityData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/listings/`, amenityData, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getAmenityById = async (amenityId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/amenities/${amenityId}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.updateAmenityById = async (amenityId, amenityData) => {
  console.log("csrf: ", apiHelpers.getCsrfConfig());
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/amenities/${amenityId}/`,
      amenityData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.deleteAmenityById = async (amenityId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(
      `${BASE_URL}/amenities/${amenityId}/`,
      apiHelpers.getCsrfConfig()
    )
  );
};

// reviews methods

apiCalls.getAllReviews = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/reviews/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.createReview = async (reviewData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(`${BASE_URL}/reviews/`, reviewData, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getReviewById = async (reviewId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/reviews/${reviewId}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.updateReviewById = async (reviewId, reviewData) => {
  console.log("csrf: ", apiHelpers.getCsrfConfig());
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/reviews/${reviewId}/`,
      reviewData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.deleteReviewById = async (reviewId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(`${BASE_URL}/reviews/${reviewId}/`, apiHelpers.getCsrfConfig())
  );
};

// reservation methods

apiCalls.getAllReservations = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/reservations/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.createReservation = async (reservationData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(
      `${BASE_URL}/reservations/`,
      reservationData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.getReservationById = async (reservationId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(
      `${BASE_URL}/reservations/${reservationId}/`,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.updateReservationById = async (reservationId, reservationData) => {
  console.log("csrf: ", apiHelpers.getCsrfConfig());
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/reservations/${reservationId}/`,
      reservationData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.deleteReservationById = async (reservationId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(
      `${BASE_URL}/reservations/${reservationId}/`,
      apiHelpers.getCsrfConfig()
    )
  );
};

//addresses

apiCalls.getAllAddresses = async () => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/addresses/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.createAddress = async (addressData) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.post(
      `${BASE_URL}/addresses/`,
      addressData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.getAddressById = async (addressId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.get(`${BASE_URL}/addresses/${addressId}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.updateAddressById = async (addressId, addressData) => {
  console.log("csrf: ", apiHelpers.getCsrfConfig());
  return await apiHelpers.tryCatchFetch(() =>
    axios.patch(
      `${BASE_URL}/addresses/${addressId}/`,
      addressData,
      apiHelpers.getCsrfConfig()
    )
  );
};

apiCalls.deleteAddressById = async (addressId) => {
  return await apiHelpers.tryCatchFetch(() =>
    axios.delete(
      `${BASE_URL}/addresses/${addressId}/`,
      apiHelpers.getCsrfConfig()
    )
  );
};

export default apiCalls;
