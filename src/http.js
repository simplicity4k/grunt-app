#!/usr/bin/env node

var expressServer = require('./server');

expressServer.set('port', process.env.PORT || 9000);

var server = expressServer.listen(expressServer.get('port'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express server listening on address %s and port %s', host, port);
});
