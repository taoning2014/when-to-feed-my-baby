var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/daniel';

MongoClient.connect(uristring, function(err, db) {
  assert.equal(err, null);
  console.log('Successfully connected to MongoDB.');

  router.get('/api/v1', function(req, res) {
    db.collection('daniel').find().toArray(function(err, docs) {
      assert.equal(err, null);
      res.json(docs);
    });
  });

  router.post('/api/v1', function(req, res) {
    var obj = req.body;
    db.collection('daniel').insertOne(obj, function(err) {
      if (err) {
        res.send('Insert failed');
      } else {
        res.send('Insert success');
      }
    });
  });

  router.delete('/api/v1', function(req, res) {
    db.collection('daniel').remove(function(err) {
      if (err) {
        res.send('Remove failed');
      } else {
        res.send('Remove success');
      }
    });
  });
});


module.exports = router;
