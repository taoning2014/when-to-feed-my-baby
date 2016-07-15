var express = require('express');
var elastic = require('../db/elasticsearch');
var router = express.Router();

// init db if index not exist
elastic.indexExists().then(function (exists) {
  if (exists) {
    console.log('index exist, don\'t load init data');
    return;
  }

  console.log('index not exist, init db');
  elastic
    .initIndex()
    .then(elastic.initMapping())
    .then(function () {
      var test = require('../db/initData.js');
      test.map(function (dataObj) {
        return elastic.addDocument(dataObj);
      });
      console.log('init data load success');
    });
});

router.get('/api/v1', function (req, res) {
  elastic.searchDocument().then(function (data) {
    var processedData = data.hits.hits
      // don't know how to only return _source filed, so process data here
      .map(function (item) {
        return item._source;
      // don't know how to only return 10 most recent data, so sort and slice here
      }).sort(function (item1, item2) {
        return -item1.date.localeCompare(item2.date);
      }).slice(0, 10);

    res.json(processedData);
  });
});

router.post('/api/v1', function (req, res) {
  console.log('Got post request: ');
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
