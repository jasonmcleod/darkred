'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.directives', 'state']).config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.when('/login', {templateUrl: 'partials/login'});
        $routeProvider.when('/characters', {templateUrl: 'partials/characters'});
        $routeProvider.when('/instances', {templateUrl: 'partials/instances'});
        $routeProvider.when('/game', {templateUrl: 'partials/game'});

        $routeProvider.otherwise({redirectTo: '/login'});
        $locationProvider.html5Mode(true);
    }
]);


