var express = require('express');
var router = express.Router();

/* Fuckaround search page. */
router.get('/', function(request, response, next) {
  console.log("search page loaded correctly");
  response
    .render('search', { title: 'Search' });
});

router.post('/', function(request, response, next) {
  console.log("hits the post for search!");

  //this variable is whatever the user typed in when they searched 
  //throw this into the query for the database
  //for now just search based on city
  console.log(request.body.keyword);
  const keyword = request.body.keyword;

  //you must respond with something in order for this shit to work
  //Once you get the results from the database using the keyword  query
  //you can then response with a json-like object (the results from the db)
  response.send("some sample text")
});

module.exports = router;