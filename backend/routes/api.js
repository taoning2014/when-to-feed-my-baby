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
  console.log("Successfully connected to MongoDB.");

  router.get('/api/v1', function(req, res) {
    res.send('get request for /api/v1');
  });

  router.post('/api/v1', function(req, res) {
    res.send('post request for /api/v1');
  });


});


module.exports = router;
