var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("about page loaded");
  res.render('about', { title: 'About' });
});

module.exports = router;
