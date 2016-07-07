// got code from https://github.com/RaananW/express.js-elasticsearch-autocomplete-demo

var elasticsearch = require('elasticsearch');
var URL_STRING =
  process.env.TOBE_ES ||
  'localhost:9200';

var elasticClient = new elasticsearch.Client({
  host: URL_STRING,
  log: 'info'
});

var indexName = 'daniel';


// Delete an existing index
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}

// create the index
function initIndex() {
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
  return elasticClient.indices.putMapping({
    index: indexName,
    type: 'document',
    body: {
      properties: {
        title: {type: 'string'},
        content: {type: 'string'}
      }
    }
  });
}


function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: 'document',
    body: {
      title: document.title,
      content: document.content
    }
  });
}

exports.indexExists = indexExists;
exports.deleteIndex = deleteIndex;
exports.initIndex = initIndex;
exports.initMapping = initMapping;
exports.addDocument = addDocument;
