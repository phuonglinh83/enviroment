/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 */
var express = require('express');
var router = express.Router();
const fs = require('fs-extra');

const getIssue = require('../db/issues/getIssue');
const getComments = require('../db/comments/getCommentsForIssue');
const getComment = require('../db/comments/getComment');
const addIssue = require('../db/issues/addIssue');
const addComment = require('../db/comments/addComment');

// Render the issue creation form.
router.get('/create', function(req, res) {
  res.render("form", { title: 'Create issue'});
});

// Adding the issue to the database.
router.post('/create', function(req, res) {
  // Copy image file to the target location
  // console.log(req.body);
  let image = req.files.fileName;
  let imagePath = null;
  if (image) {
    // Copy the uploaded image to the static files
    fs.copy(image.file, 'public/resources/issue_images/' + image.filename, err => {
      if (err) {
        return res.status(500).send(err);
      }
    });
    imagePath = '/resources/issue_images/' + image.filename;
  } else {
    imagePath = '#';
  }

  // If not logged in, choose anonymous user
  let user_id = req.user ? req.user.user_id : 1;
  let username = req.user ? req.user.username : "anonymous";

  // Now add issue from the request into the database
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
    longtitude: req.body.lng,
    latitude: req.body.lat,
    imagePath: imagePath,
    isFlagged: false})
    .then( result => {
      console.log(result.issue_id);
      res.redirect("/issue/" + result.issue_id);
    });
});

// Adding a comment into the database
router.post('/postComment', function(req, res) {
  // console.log(req.body);
  // Only logged in user can comment
  const user_id = req.user.user_id;
  addComment({
    issue_id: req.body.issue_id,
    user_id: user_id,
    content: req.body.content
  }).then (result => {
    // console.log(result);
    // If successfully added, return the newly added comment
    getComment( result.comment_id ).then( comment => {
      res.status(200).json(comment);
    }).catch( error => console.log( "ERROR: ", error ) );
  })

});

// Rendering detailed view of the issue, including all comments.
router.get('/:id', function(req, res) {
  // Query database to get the details of the issue
  getIssue( req.params.id ).then( issue => {
    // console.log(issue);
    res.render("detailedview", { title: 'Detailed view', issue: issue});
  }).catch( error => console.log( "ERROR: ", error ) );
});

// Return longtitude and latitude for a given issue
router.get('/:id/location', function(req, res) {
  // Query database to get the issue information
  getIssue( req.params.id ).then( issue => {
    // Then return a JSON object for longtitude and latitude
    res.status(200).json({lat: issue.latitude, lng: issue.longtitude});
  }).catch( error => console.log( "ERROR: ", error ) );
});

// Return JSON objects for all comments on a given issue
router.get('/:id/comments', function(req, res) {
  getComments( req.params.id ).then( comments => {
    res.status(200).json(comments);
  }).catch( error => console.log( "ERROR: ", error ) );
});

module.exports = router;
