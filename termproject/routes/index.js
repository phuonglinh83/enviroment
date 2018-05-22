/**
 * ============================ index.js ===================================
 * Renders the homepage and is responsible for handling requests.
 *
 */

var express = require('express');
var router = express.Router();
const searchQuery = require('../db/search');
var gm = require('gm');
var fs = require('fs');


/* GET home page. */
// router.use(function(req, res, next) {
//   res.locals.myname = 5;
//   console.log(res.locals);
//   next();
// });

// var testFolder = './public/images'
// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//     // gm("./public/images/" + file).resize(84, 125).write("./public/images/thumbnails/"+ file, function(err){console.log(err);});
//     gm("./public/images/" + file).thumb(255, 125, "./public/images/thumbnails/"+ file, 90, function(err){console.log(err);});
//   });
// })


// gm("./public/images/smalltest.jpg").resize(200, 200).write("./public/images/myOutImage.jpg", function(err){console.log(err);});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
