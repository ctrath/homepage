var express = require('express');
var Parser = require('rss-parser');
var router = express.Router();
var parser = new Parser();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
