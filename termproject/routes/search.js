var express = require('express');
var router = express.Router();

const searchQuery = require('../db/search');


router.get('/', function (request, response) {
  console.log("search page loaded correctly");
  response
    .render('search', { title: 'Search' });
});

router.post('/', function (request, response) {
  const keyword = request.body.keyword;
  searchQuery
    .fuzzySearch(keyword)
    .then(searchResult => {
      response
        .send(searchResult);
    })
    .catch(error => console.log("ERROR: ", error));
});

module.exports = router;
