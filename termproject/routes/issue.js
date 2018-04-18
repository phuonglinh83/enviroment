/**
 * ============================ issue.js ===================================
 * This file handles all requests related to issues.
 *
 */

var express = require('express');
var router = express.Router();

// Render the issue creation form.
router.get('/create', function(req, res) {
  res.send("This will be the issue creation page")
});

// Adding the issue to the database.
router.post('/create', function(req, res) {
  // Add issue creation code here.
})

// Rendering detailed view of the issue.
router.get('/:id', function(req, res) {
  res.render('issue', { title: 'Issue' });
});

module.exports = router;
