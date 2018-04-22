/**
 * ============================ search.js ===================================
 * Handles search requests from the user.
 *
 */

var express = require('express');
var router = express.Router();

const search = require('../db/search');


router.get("/", function(req, res) {
    let searchQuery = req.query.keyword;
    let filter = req.query.filter;
    console.log(searchQuery);
    if(filter == "all" || filter == "") {
      search.searchAll( searchQuery ).then( searchResults => {
        res.status(200).json(searchResults);
      }).catch( error => console.log( "ERROR: ", error ) );
    }
    else if(filter == "city") {
      search.searchByCity( searchQuery ).then( searchResults => {
          res.status(200).json(searchResults);
       }).catch( error => console.log( "ERROR: ", error ) );
    }
    else if(filter == "category") {
      search.searchByCategory( searchQuery ).then( searchResults => {
          res.status(200).json(searchResults);
       }).catch( error => console.log( "ERROR: ", error ) );
    }
    else if(filter == "status") {
      search.searchByStatus( searchQuery ).then( searchResults => {
          res.status(200).json(searchResults);
       }).catch( error => console.log( "ERROR: ", error ) );
    }
    // else
        // console.log("Search Failed!")
    // }
});

module.exports = router;
