var express = require('express');
var Parser = require('rss-parser');
var cheerio = require('cheerio');
var router = express.Router();
var parser = new Parser();
var displayNum = 20;

/* GET deals page. */
router.get('/', function(req, res, next) {
  let renderData = [];
  let curDisplayNum = 0;
  (async () => {  
    let feed = await parser.parseURL('https://www.dealnews.com/rss/todays-edition/');
    for(const item of feed.items) {
      const $ = cheerio.load(item.content);
      const imgSrc = $('img').attr('src');
      renderData.push({title: item.title, link: item.link, img: imgSrc});
      if (displayNum < curDisplayNum) {
          break;
      }
      curDisplayNum++;
    };
    res.render('deals', {data: renderData})
  })();
});

module.exports = router;
