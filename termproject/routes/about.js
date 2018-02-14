var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
    console.log("index page loaded");
  res.render('about_old', { title: 'Express' });
  next();
});

module.exports = router;
