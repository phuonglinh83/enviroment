/**
 * ============================ index.js ===================================
 * Renders the homepage and is responsible for handling requests.
 *
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("index page loaded");
  res.render('index', { title: 'Home' });
});

module.exports = router;
