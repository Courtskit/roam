import RandomContent from '../components/RandomContent';

export const Blog = () => {
  return (
    <div className="genericCenterContentArticles">
      <h1 className=" genArticleHeader">Who we are </h1>
      <p className="genParagraphText">At ROAM, we are a team of fresh outdoor loving folks. We beleive a good life is a life outdoors. Our purpose is to encourage others to awaken a life long journey of exploring the outdoors. We bring you some of the best accomadations to truly experience an adventure.</p>
      <p className="genParagraphText">We strive to make a positive impact everywhere we can. Here at ROAM, we are fully remote which allows us to save energy and resources. We also choose to donate 5% of all proceeds to protect the lands we love.</p>

      <img alt="tent" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/glamp.jpg')}></img>

      <h2 className="genArticleHeader">8 Things You Can Do To Make A Positively Impact On The Environment</h2>
      <ul className="genParagraphText">
        <p>Unplug Electronics</p>
        <p>Recycle</p>
        <p>Eat Less Meat</p>
        <p>Plant a Tree</p>
        <p>Reduce Unnecessary Waste</p>
        <p>Cut Down on Water</p>
        <p>Say No to One Time Use Products</p>
        <p>Use Energy-Efficient Products</p>
      </ul>

      <h2 className="genArticleHeader">Non-Profits</h2>

      <a className="genParagraphText" href="http://www.conservationalliance.com/" target="_blank" rel="noreferrer"><p>Conservation Alliance</p></a>
      <a className="genParagraphText" href="https://www.bigcitymountaineers.org/" target="_blank" rel="noreferrer"><p>Big City Mountaineers</p></a>
      <a className="genParagraphText" href="https://www.onepercentfortheplanet.org/" target="_blank" rel="noreferrer"><p>1% For The Planet</p></a>
      <a className="genParagraphText" href="https://www.utahopenlands.org/" target="_blank" rel="noreferrer"><p>Utah Open Lands</p></a>

      <img alt="tent" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/glamp2.jpg')}></img>

      <h3 className="heavyText padding" >10% Off Your First ROAM Booking</h3>
      <p className="marginBottom">USE CODE: ja0284nlsjhg-AJGFO20akjfiujckajl3jpqomznc</p>

      <h2 className=" genArticleHeader">Conservation</h2>

      <p className="genParagraphText">Earth has many natural resources, which include air, minerals, plants, soil, water, and wildlife. Conservation can play a huge impact on the care and protection of these resources so that they can persist for future generations. Conservation can pertain to a large variety of actions, such as maintaining diversity of species, genes, and ecosystems, as well as functions of the environment, such as nutrient cycling.</p> 
      <p className="genParagraphText">Conservation is similar to preservation, but while both relate to the protection of nature, they strive to accomplish this task in different ways. Conservation seeks the sustainable use of nature by humans, for activities such as hunting, logging, or mining, while preservation means protecting nature from human use. As you can see, both are important but it is important to recognize the differences.</p>
      <p className="genParagraphText">One difference regarding this, is illustrated by how the United States manages its public lands. The goal of National Parks, for instance, is preservation with an emphasis on causing minimal change to the landscape or environment, meanwhile National Forests can be used for cattle grazing, lumber, hunting, and recreation. Making policies like these are essential to preservation.</p>
      <p className="genParagraphText">Continued human population growth has led to unsustainable rates of consumption of our natural resources, resulting in a loss of biodiversity within our planet. The main factors driving biodiversity loss include habitat destruction, climate change, invasive species, overexploitation, and pollution. There is a lot of small choices we can make to encourage a positive impact. Here at ROAM, it is a company mission to strive to make a positive impact.</p>
      <p className="genParagraphText">Forest conservation is the practice of planting and maintaining forested areas for the benefit and sustainability of future generations. The conservation of forest also stands and aims at a quick shift in the composition of trees species and age distribution. Forest conservation involves the upkeep of the natural resources within a forest that are beneficial to both humans and the environment.  We encourage you to pick up trash on your hikes,reduce use of single use plastics, and leave no trace.</p>

      <img alt="trees" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/treesandwater.jpg')}></img>

      <div className="border">
        <h2 className=" genArticleHeader">Events</h2>
        <div className="genParagraphText">
          <h4>JUN 4</h4>
          <h4>ROAM Hike and Bike</h4>
          <h5>Sat, 9:00 AM - 4:30 PM</h5>
          <h5>1429 Pikes Street, 98071 Seattle WA</h5>
        </div>

        <div className="genParagraphText">
          <h4>AUG 4</h4>
          <h4>Run Like a Girl Half Maration and 10k</h4>
          <h5>Sat, 9:00 AM</h5>
          <h5>223 Capital Street, 38028 Salt Lake City UT</h5>
        </div>

        <div className="genParagraphText">
          <h4>AUG 27</h4>
          <h4>Group SUP: Paddle the Lake</h4>
          <h5>Sat, 9:00 AM</h5>
          <h5>Diablo Lake Ramp, North Cascades</h5>
        </div>
      </div>

      <h2 className="genArticleHeader">Top rated podcasts for you to checkout</h2>

      <a className="genParagraphText" href="https://www.rei.com/blog/podcasts/wild-ideas-worth-living" target="_blank" rel="noreferrer"><p>Wild Ideas Worth Living</p></a>

      <a className="genParagraphText" href="https://www.outsideonline.com/podcast/" target="_blank" rel="noreferrer"><p>Outside Podcast</p></a>

      <a className="genParagraphText" href="https://www.rei.com/blog/podcasts/wild-ideas-worth-living" target="_blank" rel="noreferrer"><p>Happy Camper Radio</p></a>

      <RandomContent />

    </div>
  );
};

export default Blog;