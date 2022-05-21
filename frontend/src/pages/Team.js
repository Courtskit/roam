import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import ROAMLogo from '../static/branding/roam-logo.svg';

import "../styles/generic.css"

export const Team = () => {
  return (
    <div className="genericCenterContent heavyText">
      <h1 className="genArticleHeader"> Meet the team!</h1>
      <div className='genericContainer'>
        <img alt="Phillip" className='box imgsize centerBlockElement padding' src={require('../static/headshots/Phillip.webp')}></img>
        <h2 className="genParagraphText" >Phillip Hall</h2>
        <a className="genericIconSize" href="https://www.linkedin.com/in/philliphall131/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}>LinkedIn</FontAwesomeIcon></a>
      </div>
      
      <img alt="Suruchi" className='box imgsize centerBlockElement padding' src={require('../static/headshots/suruchi.jpg')}></img>
      <h2 className="genParagraphText" >Suruchi Khand</h2>
      <a className="genericIconSize" href="https://www.linkedin.com/in/suruchi-k-2387b7232/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}>LinkedIn</FontAwesomeIcon></a>

      <img alt="Courtney" className='box imgsize centerBlockElement padding' src={require('../static/headshots/court.jpeg')}></img>
      <h2 className="genParagraphText">Courtney Smith</h2>
      <a className="genericIconSize" href="https://www.linkedin.com/in/courtneycodes/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}>LinkedIn</FontAwesomeIcon></a>

      <img alt="Lyman" className='box imgsize centerBlockElement padding' src={require('../static/headshots/Lyman2.webp')}></img>
      <h2 className="genParagraphText">Lyman Perrine</h2>
      <a className="genericIconSize" href="https://www.linkedin.com/in/lymanperrine/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}>LinkedIn</FontAwesomeIcon></a>

      <img alt='Marcin' className='box imgsize centerBlockElement padding' src={require('../static/headshots/marcin.png')}></img>
      <h2 className="genParagraphText">Marcin Swaltek</h2>
      <a className="genericIconSize" href="https://www.linkedin.com/in/marcin-s-1799a81b8/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin}>LinkedIn</FontAwesomeIcon></a>

      <Link to="/"><img className='genLogoLink' src={ ROAMLogo } alt="ROAM Logo"></img></Link>

    </div>
  );
};

export default Team;
