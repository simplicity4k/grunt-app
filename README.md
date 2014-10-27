Grunt application skeleton
==========================

Grunt skeleton with bower, grunt, express, jade, angular, bootstrap, karma, protractor.

Live reload as you develop angular application with jade templates.
Code checking with jshint and karma in background with phantomjs and html code coverage.
End to end tests with protractor on firefox and chrome.

Distribute optimized package with compressed files and gzip for server compression.

Install
-------

Run npm install.

Develop
-------

Run grunt server

Distribute
----------

Run grunt dist

End to end tests
----------------

Run grunt server, then grunt protractor.

Or

Run grunt dist, set NODE_ENV=production (or development), node dist\http.js, and then grunt protractor.
