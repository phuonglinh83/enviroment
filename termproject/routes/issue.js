/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 * CONTRIBUTORS: Uzair Inamdar, Gerren Penaloza, Justin Abarquez
 */

var express = require('express');
var router = express.Router();

const getIssue = require('../db/issues/getIssue');

// Render the issue creation form.
router.get('/create', function(req, res) {
  res.render("form", { title: 'Create issue'});
});

// Adding the issue to the database.
router.post('/create', function(req, res) {
  console.log(req.body.issueTitle);
});

// Rendering detailed view of the issue.
router.get('/:id', function(req, res) {
  getIssue( req.params.id ).then( issue => {
    // console.log(issue);
    res.render("detailedview", { title: 'Detailed view', issue: issue});
  }).catch( error => console.log( "ERROR: ", error ) );
  // res.send(req.params.id)
});

module.exports = router;
