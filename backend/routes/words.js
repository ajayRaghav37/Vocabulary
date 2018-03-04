var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect('/#login');

  return next();
});

router.route('/')

  // returns words list
  .get(function (req, res) {
    res.send('TODO return words list for user ' + req.user.username);
  })

  // adds a word
  .post(function (req, res) {
    res.send('TODO create a new word');
  });

router.route('/:word')

  //returns a specific word
  .get(function (req, res) {
    res.send('TODO return the word ' + req.params.word);
  })

  // updates a word
  .put(function (req, res) {
    res.send('TODO update word ' + req.params.word);
  })

  // deletes a word
  .delete(function (req, res) {
    res.send('TODO delete word ' + req.params.word);
  });

module.exports = router;