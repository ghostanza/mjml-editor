var express = require('express'),
    router = express.Router(),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    request = require('request');

// main app
router.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../pub/index.html'));
});

module.exports = router;
