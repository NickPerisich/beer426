var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world");
});

router.post('/likes', function(req, res, next) {
  const db = req.db.get('users');
  db.update({username: req.body.username}).then(user => {
    res.send(user.likedBeers);
  });
});

router.post('/updatelikes', function(req, res, next) {
  const db = req.db.get('users');
  db.update({username: req.body.username}, { '$set': {"likedBeers" : req.body.likedBeers}})
});

router.post('/login', function(req, res, next) {
  const db = req.db.get('users');
  db.findOne({username: req.body.username}).then(user => {
    if (!user) {
      res.send('INCORRECT');
    }
    else if (user.username === req.body.username && user.password === req.body.password) {
      res.send(user);
    }
    else {
      res.send('INCORRECT');
    }
  });
});

router.post('/register', function(req, res, next) {
  const db = req.db.get('users');
  db.findOne({username: req.body.username}).then(user => {
    if (user) {
      res.send("TAKEN");
    }
    else {
      db.insert(req.body);
      res.send("SUCCESS");
    }
  });
});

module.exports = router;
