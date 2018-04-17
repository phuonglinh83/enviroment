var express = require('express');
var router = express.Router();
const searchQuery = require('../db/search');


/* GET home page. */
// router.use(function(req, res, next) {
//   res.locals.myname = 5;
//   console.log(res.locals);
//   next();
// });

router.get('/create', function(req, res) {
  res.render("form", { title: 'Create issue'});
});

router.get('/:id', function(req, res) {
  let dataObj= {
    username: "gerren",
    category: "pollution"
  }
  res.render("detailedview", { title: 'Detailed view', data: dataObj});
  // res.send(req.params.id)
});

router.post('/submit', function(req, res, next) {
    console.log(req.body.issueTitle);
  // res.render('index', { title: 'Home' });
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
