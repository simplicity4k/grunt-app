(function () {

    'use strict';

    angular.module('Application', ['ngRoute', 'ApplicationControllers'], function () {
    });

    angular.module('Application').constant('ENTRY_POINT', '/grunt-sample-001/index.html#');

    var configuration = function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'html/home.html',
                controller: 'HomeController'
            })
            .when('/sample', {
                templateUrl: 'html/sample.html',
                controller: 'SampleController'
            })
            .otherwise({
                redirectTo: '/home'
            });
        //$locationProvider.html5Mode(true);
    };

    configuration.$inject = ['$routeProvider'];

    angular.module('Application').config(configuration);

    angular.module('ApplicationControllers', []);
})();
