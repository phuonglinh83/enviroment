var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("index page loaded");
  res.render('index', { title: 'Home' });
});

module.exports = router;
