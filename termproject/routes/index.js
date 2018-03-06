var express = require('express');
var router = express.Router();

/* GET home page. */
// router.use(function(req, res, next) {
//   res.locals.myname = 5;
//   console.log(res.locals);
//   next();
// });

router.get('/', function(req, res, next) {
    console.log("index page loaded");
  res.render('index', { title: 'Home' });
});

module.exports = router;
