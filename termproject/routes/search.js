/**
 * ============================ search.js ===================================
 * Handles search requests from the user.
 * 
 * CONTRIBUTORS: Uzair Inamdar, Gerren Penaloza
 */

var express = require('express');
var router = express.Router();

const search = require('../db/search');


router.get("/", function(req, res) {
    let searchQuery = req.query.keyword;
    let filter = req.query.filter;
    console.log(searchQuery);

    const handleResponse = (data) => {
      // .then(data => {
        if(data.length == 0 || searchQuery == "") {
          search.getRecenet().then((recentIssues) => {
            let response = {
              success: false,
              issues: recentIssues
            }
            res.status(200).json(response);
          }).catch( error => console.log( "Error in search: ", error.stack) );
        } else {
          let response = {
            success: true,
            issues: data
          }
          res.status(200).json(response);
        }
    }

    if(filter == "all" || filter == "") {
      search.searchAll( searchQuery ).then( searchResults => {
        handleResponse(searchResults);
      }).catch( error => console.log( "ERROR: ", error.stack ) );
    }
    else if(filter == "city or zip") {
      console.log(filter);
      search.searchByCity( searchQuery ).then( searchResults => {
        console.log("In city: "+JSON.stringify(searchResults));
          handleResponse(searchResults);
       }).catch( error => console.log( "ERROR: ", error.stack ) );
    }
    else if(filter == "category") {
      search.searchByCategory( searchQuery ).then( searchResults => {
          handleResponse(searchResults);
       }).catch( error => console.log( "ERROR: ", error.stack ) );
    }
    else if(filter == "status") {
      search.searchByStatus( searchQuery ).then( searchResults => {
          handleResponse(searchResults);
       }).catch( error => console.log( "ERROR: ", error.stack ) );
    }
    // else
        // console.log("Search Failed!")
    // }
});

module.exports = router;
