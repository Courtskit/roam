import UserInfo from "./UserInfo";
import "../../styles/account.css";
import ReservationDetails from "./ReservationDetails";
import SavedSites from "./SavedSites";
import PastStays from "./PastStays";
import MySites from "./MySites";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import HeadingText from "../../components/HeadingText";

function Account(props) {
  return (
    <div className="container centerBlockElement">
      <HeadingText pt="2" text="Account Details" />

      <div className="fullWidth">
        <UserInfo user={props.user} setUser={props.setUser} />
      </div>

      <div className="fullWidth ">
        <ReservationDetails />
      </div>

      <div className="fullWidth ">
        <SavedSites user={props.user} setUser={props.user} />
      </div>

      <div className="fullWidth ">
        <PastStays user={props.user} />
      </div>

      <div class="fullWidth ">
        <MySites user={props.user} />
      </div>
    </div>
  );
}

export default Account;
