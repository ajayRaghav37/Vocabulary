var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/word');

var word = mongoose.model('word');
var userWordInit = require('../models/userWord');

router.use(function (req, res, next) {
  if (!req.isAuthenticated())
    return res.redirect('/#login');

  return next();
});

router.route('/')

  // returns words list
  .get(function (req, res) {
    userWordInit(req.user.username);

    var userWord = mongoose.model(req.user.username + 'Word');

    userWord.find((err, docs) => {
      if (err)
        return res.send(500, err);

      var words = docs.map(x => {
        return {
          word: x.word,
          connotation: x.connotation
        };
      });

      res.json(words);
    });
  })

  // adds a word
  .post(function (req, res) {
    userWordInit(req.user.username);

    var userWord = mongoose.model(req.user.username + 'Word');

    var baseWord = {
      word: req.body.word,
      posTag: req.body.posTag,
      meaning: req.body.meaning,
      connotation: req.body.connotation,
      examples: req.body.examples,
      relations: [],
      relationScale: req.body.relationScale,
      imgUrls: req.body.imgUrls
    };
    var newWord = new userWord(baseWord);

    var relationsToAdd = [];

    for (i in req.body.relations)
      if (req.body.relations[i].word !== undefined) {
        relationsToAdd.push({
          word: req.body.relations[i].word,
          posTag: req.body.relations[i].posTag,
          connotation: req.body.relations[i].connotation
        });
      }
    else
      newWord.relations.push(req.body.relations[i]);

    userWord.insertMany(relationsToAdd, (err, docs) => {
      newWord.relations = newWord.relations.concat(docs.map(x => {
        for (i in req.body.relations)
          if (req.body.relations[i].word === x.word)
            return {
              wordId: x._id,
              scalePoint: req.body.relations[i].scalePoint
            };
      }));

      newWord.save((err, doc) => {
        if (err)
          return res.send(500, err);

        res.json(doc);
      });
    });
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