var express = require('express');
var router = express.Router();

const searchQuery = require('../db/search');


router.get('/', function (request, response) {
  console.log("search page loaded correctly");
  response
    .render('search', { title: 'Search' });
});

router.post('/', function (request, response) {
  console.log("hits search default");
  searchQuery
    .defaultSearch()
    .then(defaultSearchResult => {
      console.log(defaultSearchResult);
      response
        .send(defaultSearchResult);
    })
    .catch(error => console.log("ERROR IN DEFAULT SEARCH: ", error));
});

module.exports = router;