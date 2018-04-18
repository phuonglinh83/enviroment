var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("about page loaded");
  res.render('users', { title: 'User' });
});
module.exports = router;
