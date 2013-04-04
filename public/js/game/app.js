'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.directives']).config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    }
]);

var cursorX, cursorY;
var debugging = false

$(function() {
    $(window).bind('mousemove',function(e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
    })
})