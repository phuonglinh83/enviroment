/**
 * ============================ about.js ===================================
 * This file renders the about page.
 * 
 * CONTRIBUTORS: Uzair Inamdar
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("about page loaded");
  res.render('about', { title: 'About' });
});

module.exports = router;
