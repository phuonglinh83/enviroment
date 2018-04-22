/**
 * ============================ index.js ===================================
 * Renders the homepage and is responsible for handling requests.
 *
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
