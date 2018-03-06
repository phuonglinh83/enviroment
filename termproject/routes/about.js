var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
    console.log("page loaded");
  res.render('about', { title: 'About' });
});

module.exports = router;
