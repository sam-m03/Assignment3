var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home Page'});
});

/* GET home page. (case 2) */
router.get('/home', function(req, res, next) {
    res.render('index', {title: 'Home Page'});
  });



module.exports = router;
