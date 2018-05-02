/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 */
var express = require('express');
var router = express.Router();
const fs = require('fs-extra');

const getIssue = require('../db/issues/getIssue');
const getComments = require('../db/comments/getComments');
const addIssue = require('../db/issues/addIssue');
const addComment = require('../db/comments/addComment');

// Render the issue creation form.
router.get('/create', function(req, res) {
  res.render("form", { title: 'Create issue'});
});

// Adding the issue to the database.
router.post('/create', function(req, res) {
  // Copy image file to the target location
  let image = req.files.fileName;
  fs.copy(image.file, 'public/resources/issue_images/' + image.filename, err => {
    if (err)
      return res.status(500).send(err);
  })

  // If not logged in, choose anonymous user
  let user_id = req.user ? req.user.user_id : 1;
  let username = req.user ? req.user.username : "anonymous";

  addIssue({
    category_id: req.body.category,
    user_id: user_id,
    status_id: 1,
    title: req.body.issueTitle,
    description: req.body.description,
    username: username,
    streetAddress: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    numberOfOccurrences: 1,
    imagePath: '/resources/issue_images/' + image.filename,
    isFlagged: false})
    .then( result => {
      console.log(result.issue_id);
      res.redirect("/issue/" + result.issue_id);
    });
});

// Adding a comment into the database
router.post('/createComment', function(req, res) {
  console.log(req.body);
  // Assume 1 is for anonymous user
  const user_id = req.user.user_id;
  addComment({
    issue_id: req.body.issue_id,
    user_id: user_id,
    content: req.body.content
  }).then (result => {
    // Render the detailed view again with the new comment
    res.redirect("/issue/" + req.body.issue_id);
  })

});

// Rendering detailed view of the issue, including all comments.
router.get('/:id', function(req, res) {
  // First get the details of the issue
  getIssue( req.params.id ).then( issue => {
    // Then get all comments related to the issue
    getComments( req.params.id ).then( comments => {
      res.render("detailedview", { title: 'Detailed view', issue: issue, comments: comments});
    })
  }).catch( error => console.log( "ERROR: ", error ) );
});

module.exports = router;
