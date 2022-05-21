export const LeaveNoTrace = () => {
  return (
    <div className="genericCenterContentArticles marginBottom">
      <h1 className="padding genArticleHeader">Leave No Trace</h1>
      <h3 className='genParagraphText'>Travel and Camp on Designated Surfaces</h3>
      <h3 className='genParagraphText'>Plan Ahead and Prepare</h3>
      <h3 className='genParagraphText'>Stay Attentative of Campfire</h3>
      <h3 className='genParagraphText'>Leave What You Find Where You Found It</h3>
      <h3 className='genParagraphText'>Respect All Wildlife</h3>
      <h3 className='genParagraphText'>Be Considerate of Others</h3>
      <h3 className='genParagraphText'>Dispose of Any Waste Properly</h3>
      <h3 className='genParagraphText'>Leave It Better Than You Found It</h3>
      <img alt="trees" className='centerBlockElement padding genArticleImg marginBottom box' src={require('../static/leavenotrace.jpg')}></img>
    </div>
  );
};

export default LeaveNoTrace;