var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var path = require('path');

var server = express();

if (server.get('env') === 'production') {
    server.use(compression());
    console.log('uses compression');
}

var home = require(path.join(__dirname, 'route/home'));

server.set('views', path.join(__dirname, 'view'));
server.set('view engine', 'jade');

var maxAge = server.get('env') === 'production' ? '31536000000' : null;

server.use(express.static(path.join(__dirname, 'public'), {maxAge: maxAge}));
server.use(favicon(path.join(__dirname, 'public', '/favicon.ico'), {maxAge: maxAge}));
server.use('/', home);

server.use(function (request, response, next) {
    'use strict';
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

if (server.get('env') === 'development') {
    server.use(function (error, request, response, next) {
        'use strict';
        response.status(error.status || 500);
        response.render('error', {
            message: error.message,
            error: error
        });
        next();
    });
}

server.use(function (error, request, response, next) {
    'use strict';
    response.status(error.status || 500);
    response.render('error', {
        message: error.message,
        error: {stack: 'Page not found'}
    });
    next();
});

module.exports = server;
