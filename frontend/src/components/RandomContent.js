import "../styles/randomContent.css";
import { Link } from "react-router-dom";
import HeadingText from "./HeadingText";

const RandomContent = (props) => {
  return (
    <>
      <HeadingText text="Explore" />
      <div className="rCmainDiv">
        <div className="blocksContainer">
          <section className="rCcontainer">
            <Link className="square1" to="/blog">
              {" "}
              <h4>Our Blog</h4>
            </Link>

            <Link className="square2" to="/expertadvice">
              {" "}
              <h4>Expert Advice</h4>
            </Link>

            <Link className="square3" to="/">
              {" "}
              <h4>Most Popular Listings</h4>
            </Link>

            <Link className="square4" to="/leavenotrace">
              {" "}
              <h4>Leave No Trace</h4>
            </Link>

            <Link className="square5" to="/campingtips">
              {" "}
              <h4>Camping Tips</h4>
            </Link>

            <Link className="square6" to="/team">
              {" "}
              <h4>Contact Us</h4>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default RandomContent;
