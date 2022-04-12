var express = require('express');
var Parser = require('rss-parser');
var router = express.Router();
var parser = new Parser();
var displayNum = 20;

/* GET news page. */
router.get('/', function(req, res, next) {
  let renderData = [];
  let curDisplayNum = 0;
  (async () => {  
    let feed = await parser.parseURL('https://news.google.com/rss');
    for(const item of feed.items) {
      renderData.push({title: item.title, link: item.link});
      if (displayNum < curDisplayNum) {
        break;
      }
      curDisplayNum++;
    };
    res.render('news', {data: renderData})
  })();
});

module.exports = router;
