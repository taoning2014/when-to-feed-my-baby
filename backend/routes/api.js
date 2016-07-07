var express = require('express');
var elastic = require('../db/elasticsearch');

var router = express.Router();
// rewrite the following 2 apis to use es
//MongoClient.connect(uristring, function(err, db) {
//  assert.equal(err, null);
//  console.log('Successfully connected to MongoDB.');
//
//  router.get('/api/v1', function(req, res) {
//    db.collection('daniel').find().toArray(function(err, docs) {
//      assert.equal(err, null);
//      res.json(docs);
//    });
//  });
//
//  router.post('/api/v1', function(req, res) {
//    var obj = req.body;
//    db.collection('daniel').insertOne(obj, function(err) {
//      if (err) {
//        res.send('Insert failed');
//      } else {
//        res.send('Insert success');
//      }
//    });
//  });
//
//  router.delete('/api/v1', function(req, res) {
//    db.collection('daniel').remove(function(err) {
//      if (err) {
//        res.send('Remove failed');
//      } else {
//        res.send('Remove success');
//      }
//    });
//  });
//});

// init db
//elastic.indexExists().then(function (exists) {
//  if (exists) {
//    console.log('index exist, delete index');
//    return elastic.deleteIndex();
//  } else {
//    console.log('index not exist');
//  }
//}).then(function () {
//  return elastic.initIndex().then(elastic.initMapping).then(function () {
//    [
//      'Thing Explainer',
//      'The Internet Is a Playground',
//      'The Pragmatic Programmer',
//      'The Hitchhikers Guide to the Galaxy',
//      'Trial of the Clone',
//      'All Quiet on the Western Front',
//      'The Animal Farm',
//      'The Circle'
//    ].map(function (bookTitle) {
//      return elastic.addDocument({
//        title: bookTitle,
//        content: bookTitle + ' content!'
//      });
//    });
//    console.log('Done with init db');
//  });
//});

//elastic.searchDocument().then(function (resp) {
//  var hits = resp.hits.hits;
//  console.log('in searchDocument');
//  console.log(hits);
//});

elastic.deleteDocument().then(function (resp) {
  console.log('in deleteDocument');
  console.log(resp);
});

module.exports = router;
