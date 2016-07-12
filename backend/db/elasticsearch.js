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
        hour: {type: 'integer'},
        feeding: {type: 'integer'},
        changing: {type: 'integer'}
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
      hour: document.hour,
      feeding: document.feeding,
      changing: document.changing
    }
  });
}

function searchDocument() {
  return elasticClient.search({
    index: indexName,
    type: 'document',
    size: 10
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
