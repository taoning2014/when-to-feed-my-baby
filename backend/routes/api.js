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
  console.log('Got get request', (new Date()).toISOString());
  elastic.searchDocument().then(function (data) {
    console.log('DDDD');
    console.log(data);
    // don't know how to only return _source filed, so process data here
    var processedData = data.hits.hits.map(function(item) {
      return item._source;
    });

    res.json(processedData);
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
