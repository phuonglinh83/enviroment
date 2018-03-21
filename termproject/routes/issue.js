var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
  res.render('issue', { title: 'Issue' });
});

module.exports = router;
