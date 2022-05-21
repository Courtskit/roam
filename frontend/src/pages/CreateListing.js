import "../styles/CreateListing.css";
import ListingForm from "../components/ListingForm";

function CreateListing(props) {
    
    return (
        <div className="listing-page">
            <div className="new-listing-content">
                <ListingForm is_boondock={false} new={true}/>
            </div>
        </div>
    )
}

export default CreateListing;