var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
    'use strict';
    response.render('home', {title: 'Express Application'});
});

module.exports = router;
