import "../styles/generic.css"

export const Legal = () => {
  return (
    <div className="genericCenterContentArticles">
      <h2 className="genArticleHeader">Terms of Use</h2>
      <h6 className="heavyText genericSecondaryHeader">AGREEMENT TO TERMS</h6>
      <p className="genParagraphText">These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity and ROAM, concerning your access to and use of ROAM as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto ROAM.</p>
      <h6 className="heavyText genericSecondaryHeader">INTELLECTUAL PROPERTY RIGHTS</h6>
      <p className="genParagraphText">Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site ROAM and the trademarks, service marks, and logos contained therein ROAM are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.</p>
      <h6 className="heavyText genericSecondaryHeader">USER GENERATED CONTRIBUTIONS</h6>
      <p className="genParagraphText">Any contributions may be visible by other users of ROAM and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby display and warrant that the creation, distribution, transmission, public representation, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</p>
      <h2 className="heavyText genericSecondaryHeader" >Privacy Policy</h2>
      <p className="genParagraphText">At ROAM, accessible at ROAM, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ROAM and how we use it. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. This policy is not applicable to any information collected offline or via channels other than this website. By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

      <img alt="trees" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/rockymountains.jpg')}></img>
    </div>
  );
};

export default Legal;