/**
 * ============================ search.js ===================================
 * Handles search requests from the user.
 *
 */

var express = require('express');
var router = express.Router();

const searchAll = require('../db/search/searchAll')

router.get("/", function(req, res) {
    let searchQuery = req.query.keyword;
    console.log(searchQuery);
    // if(searchQuery) {
        searchAll( searchQuery ).then( searchResults => {
            console.log(searchResults);
            res.status(200).json(searchResults);
         }).catch( error => console.log( "ERROR: ", error ) );
    // } else {
        // console.log("Search Failed!")
    // }
});

module.exports = router;
