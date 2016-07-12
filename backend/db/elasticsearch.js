// got code from https://github.com/RaananW/express.js-elasticsearch-autocomplete-demo

var elasticsearch = require('elasticsearch');
var URL_STRING = process.env.TOBE_ES || 'localhost:9200';
var indexName = 'daniel';
var elasticClient = new elasticsearch.Client({
  host: URL_STRING,
  log: 'info'
});

// Delete an existing index
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}

// create the index
function initIndex() {
  console.log('call initIndex');
  return elasticClient.indices.create({
    index: indexName
  });
}

// check if the index exists
function indexExists() {
  return elasticClient.indices.exists({
    index: indexName
  });
}

function initMapping() {
  console.log('call initMapping');
  return elasticClient.indices.putMapping({
    index: indexName,
    type: 'document',
    body: {
      properties: {
        date: {type: 'date'},
        time: {type: 'string', "index": "not_analyzed"},
        dateAndTime: {type: 'string', "index": "not_analyzed"},
        feeding: {type: 'integer'},
        pee: {type: 'integer'},
        poop: {type: 'integer'}
      }
    }
  });
}

function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: 'document',
    body: {
      date: document.date,
      time: document.time,
      dateAndTime: document.dateAndTime,
      title: document.title,
      feeding: document.feeding,
      pee: document.pee,
      poop: document.poop
    }
  });
}

function searchDocument() {
  return elasticClient.search({
    index: indexName,
    type: 'document'
  });
}

function deleteDocument() {
  return elasticClient.indices.delete({
    index: indexName
  });
}

exports.indexExists = indexExists;
exports.deleteIndex = deleteIndex;
exports.initIndex = initIndex;
exports.initMapping = initMapping;
exports.addDocument = addDocument;
exports.searchDocument = searchDocument;
exports.deleteDocument = deleteDocument;
