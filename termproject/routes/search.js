var express = require('express');
var router = express.Router();

const db = require('../db/search');
const searchAll = require('../db/search/searchAll')

/* Fuckaround search page. */
// router.get('/', function( request, response ) {
//   console.log("search page loaded correctly");
//   response
//     .render('search', { title: 'Search' });
// });

router.get("/", function(req, res) {
    let searchQuery = req.query.keyword;
    console.log(searchQuery);
    if(searchQuery) {
        searchAll( searchQuery ).then( searchResults => {
            console.log(searchResults);
            res.status(200).json(searchResults);
         }).catch( error => console.log( "ERROR: ", error ) );
    } else {
        console.log("Search Failed!")
    }
});

// router.post('/', function( request, response ) {
//   console.log("hits the post for search!");
//   //note that we are able to use .body because we have body parser installed
//   //this variable is whatever the user typed in when they searched
//   //throw this into the query for the database
//   //for now just search based on city
//   //console.log(request.body.keyword);
//   const keyword = request.body.keyword;
//   searchQuery
//     .searchByCity( keyword )
//     .then( searchResult => {
//         console.log(searchResult);
//
//       response
//         .send( searchResult );
//     })
//     .catch( error => console.log( "ERROR: ", error ) );
//
//   //you must respond with something in order for this shit to work
//   //Once you get the results from the database using the keyword  query
//   //you can then response with a json-like object (the results from the db)
//   //response.send("some sample text")
// });

module.exports = router;
