var express = require('express');
var router = express.Router();

router.get('/api/v1', function(req, res, next) {
  res.send('get request for /api/v1');
});

router.post('/api/v1', function(req, res, next) {
  res.send('post request for /api/v1');
});

module.exports = router;
