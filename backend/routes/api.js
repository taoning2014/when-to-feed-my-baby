var express = require('express');
var elastic = require('../db/elasticsearch');
var router = express.Router();

// init db if index not exist
elastic.indexExists().then(function (exists) {
  if (exists) {
    console.log('index exist, don\'t load init data');
    return;
  } else {
    elastic
      .initIndex()
      .then(elastic.initMapping())
      .then(function () {
        console.log('Debug: ');
        var test = require('../db/initData.js');
        console.log(test);
        test.map(function (dataObj) {
          return elastic.addDocument(dataObj);
        });
        console.log('init data load success');
      });
  }
});

router.get('/api/v1', function (req, res) {
  console.log('Got get request');
  elastic.searchDocument().then(function (data) {
    res.json(data);
  });
});

router.post('/api/v1', function (req, res) {
  console.log('Got post request');
  console.log(req.body);
  elastic.addDocument(req.body).then(function () {
    res.end('add success!');
  });
});

router.delete('/api/v1', function (req, res) {
  elastic.deleteDocument().then(function () {
    res.end('delete success!');
  });
});

module.exports = router;
