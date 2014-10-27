'use strict';

exports.config = {

    allScriptsTimeout: 11000,

    specs: ['test/e2e/**/*_test.js'],

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: false
    },

    multiCapabilities: [
        {
            'browserName': 'firefox',
            shardTestFiles: true,
            maxInstances: 1
        },
        {
            'browserName': 'chrome',
            shardTestFiles: true,
            maxInstances: 1
        }
    ],

    baseUrl: 'http://localhost:9000'
};
