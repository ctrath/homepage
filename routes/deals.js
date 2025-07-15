var express = require('express');
var Parser = require('rss-parser');
var cheerio = require('cheerio');
var router = express.Router();
var parser = new Parser({
  headers: {
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language":"en-US,en;q=0.9",
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  },
});
var displayNum = 20;

/* GET deals page. */
router.get('/', function(req, res, next) {
  let renderData = [];
  let curDisplayNum = 0;

  (async () => {

    parser.parseURL('https://www.dealnews.com/rss/todays-edition/', function(err, feed) {
      if (err) {
        console.error(err);
        return;
      }
      for(const item of feed.items) {
        const $ = cheerio.load(item.content);
        const imgSrc = $('img').attr('src');
        renderData.push({title: item.title, link: item.link, img: imgSrc});
        if (displayNum < curDisplayNum) {
          break;
        }
        curDisplayNum++;
      }
      res.render('deals', {data: renderData})
    });
  })();
});

module.exports = router;
