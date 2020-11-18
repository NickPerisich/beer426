var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("hello world");
});

router.post('/login', function(req, res, next) {
  const users = req.db.get('users');
  users.insert(req.body);
});

router.post('/register', function(req, res, next) {

  console.log(req.db);
});

module.exports = router;
