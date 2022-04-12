var express = require('express');
var Parser = require('rss-parser');
var router = express.Router();
var parser = new Parser();
var displayNum = 20;

/* GET tech news page. */
router.get('/', function(req, res, next) {
  let renderData = [];  
  (async () => {  
    let feed = await parser.parseURL('http://rss.slashdot.org/Slashdot/slashdotMain');
    let curDisplayNum = 0;
    for(const item of feed.items) {
        renderData.push({title: item.title, link: item.link});
        if (displayNum < curDisplayNum) {
            break;
        }
        curDisplayNum++;
    };
    res.render('tech', {data: renderData})
  })();
});

module.exports = router;
