/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 */

var express = require('express');
var router = express.Router();

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
  let dataObj= {
    username: "gerren",
    category: "pollution"
  }
  res.render("detailedview", { title: 'Detailed view', data: dataObj});
  // res.send(req.params.id)
});

module.exports = router;
