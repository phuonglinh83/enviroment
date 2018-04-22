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
var testFolder = './public/images'
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
    // gm("./public/images/" + file).resize(84, 125).write("./public/images/thumbnails/"+ file, function(err){console.log(err);});
    gm("./public/images/" + file).thumb(255, 125, "./public/images/thumbnails/"+ file, 90, function(err){console.log(err);});
  });
})

console.log("HelloWorld!")
// gm("./public/images/smalltest.jpg").resize(200, 200).write("./public/images/myOutImage.jpg", function(err){console.log(err);});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// FUTURE PLANS TO CORRECT SEARCH FROM POST TO GET
// router.get("/search", function(req, res) {
//     console.log("hits the post for search!");
//     if(req.query.search) {
//         const keyword = request.query.search;
//         searchQuery.fuzzySearch( keyword ).then( searchResult => {
//             console.log(searchResult);
//             response.send( searchResult );
//          }).catch( error => console.log( "ERROR: ", error ) );
//     }
// });

module.exports = router;