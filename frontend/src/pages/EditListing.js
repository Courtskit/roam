import "../styles/CreateListing.css";
import ListingForm from "../components/ListingForm";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiCalls from "../api/apiCalls";

function EditListing(props) {
    const params = useParams()
    let listingId = params.listingId

    const [listing, setListing] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        loadListing()
    },[listingId])

    const loadListing = async ()=>{
    let response = await apiCalls.getListingById(listingId)
        if (response){
            setListing(response)
            setLoaded(true)
        } 
    }

    return (
        <div className="listing-page">
            <div className="new-listing-content">
                {loaded && <ListingForm is_boondock={false} new={false} listing={listing}/>}
            </div>
        </div>
    )
}

export default EditListing;