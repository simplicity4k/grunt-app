'use strict';

module.exports = function (config) {
    config.set({

            basePath: './',

            frameworks: ['jasmine'],

            files: [
                'src/public/bower_components/angular/angular.js',
                'src/public/bower_components/angular-route/angular-route.js',
                'src/public/bower_components/angular-mocks/angular-mocks.js',
                'src/public/js/**/*.js',
                'test/unit/**/*_test.js'
            ],

            exclude: [],

            preprocessors: {
                'src/public/js/**/*.js': ['coverage'],
                'test/unit/**/*_test.js': ['coverage']
            },

            coverageReporter: {
                reporters: [
                    {type: 'html', dir: 'coverage/'},
                    {type: 'text-summary'}
                ]
            },

            reporters: ['progress', 'coverage'],

            port: 9876,

            singleRun: false,

            colors: true,

            logLevel: config.LOG_INFO,

            browsers: ['PhantomJS'],

            plugins: [
                'karma-phantomjs-launcher',
                'karma-coverage',
                'karma-jasmine'
            ]
        }
    );
};
