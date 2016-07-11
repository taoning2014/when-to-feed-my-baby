//
// ==================
// Get data from xlsx
// ==================
// Save xlsx to csv
// Run this js file which will convert csv to json
// The result file will be 'initData.json'
var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on('end_parsed', function (jsonArray) {
  fs.writeFileSync('initData.js', "module.exports = " + JSON.stringify(jsonArray));
  console.log('initData.json got updated');
});

//read from file
fs.createReadStream('./DANIEL.csv').pipe(converter);

