import FeaturedParks from '../components/FeaturedParks';

export const CampingTips = () => {
  return (
    <div className="genericCenterContentArticles">
      <h1 className=" genArticleHeader">Camping Tips </h1>

      <ul className="genParagraphText">
        <p>Always plan for bad weather</p>
        <p>Lock up scented items such as food or toothpaste</p>
        <p>Leave No Trace</p>
        <p>Don't pitch up under a tree.</p>
        <p>Take a first aid kit.</p>
        <p>Leave your tech at home</p>
        <p>Check your campsites rules</p>
        <p>Respect neighbours privacy</p>
        <p>Never cook inside your tent</p>
        <p>Plan your meals before you go</p>
        <p>Take reusable water bottles</p>
        <p>Take a comfy pillow</p>
        <p>Understand heat loss and how to prevent it</p>
        <p>Arrive during daylight hours</p>

      </ul>

      <img alt="tent" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/glamp2.jpg')}></img>

      <div className="marginBottom">
        <FeaturedParks />
      </div>


    </div>
  );
};

export default CampingTips;