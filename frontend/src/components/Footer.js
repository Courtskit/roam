import { Link } from "react-router-dom";
import "../styles/footer.css"

export const Footer = () => {
  return (
    <div className="footer">
      <div className="contain">
        <div className="col">
          <h1>Company</h1>
          <ul>
            <Link to="/blog"><h6>About</h6></Link>
            <Link to="/careers"><h6>Careers</h6></Link>
            <Link to="/team"><h6>Developers</h6></Link>
            <Link to="/team"><h6>Contact Us</h6></Link>
          </ul>
        </div>
        <div className="col">
          <h1>Products</h1>
          <ul>
            <Link to="/blog"><h6>Outdoor Podcast</h6></Link>
            <Link to="/listing"><h6>Listings</h6></Link>

          </ul>
        </div>
        <div className="col">
          <h1>Outreach</h1>
          <ul>
            <Link to="/blog"><h6>Charities</h6></Link>
            <Link to="/blog"><h6>Conservation</h6></Link>
            <Link to="/blog"><h6>Events</h6></Link>
          </ul>
        </div>
        <div className="col">
          <h1>Resources</h1>
          <ul>
            <Link to="/blog"><h6>Help Center</h6></Link>
          </ul>
        </div>
        <div className="col">
          <h1>Legal</h1>
          <ul>
            <Link to="/legal"><h6>Terms of Use</h6></Link>
            <Link to="/legal"><h6>Privacy Policy</h6></Link>
          </ul>
        </div>
        <div className="col">
          <h1>© 2022 ROAM, Inc. All rights reserved. ROAM and the ROAM logo are trademarks of ROAM, Inc.</h1>
        </div>
        
        <div className="clearfix"></div>
      </div>
  </div>
  )
}

export default Footer;