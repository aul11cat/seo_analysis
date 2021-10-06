var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('analyze/index', { title: 'Analyze Page' });
  // res.json({ id: 1, name: "Catcher in the Rye" })
});



module.exports = router;
