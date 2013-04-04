'use strict';

var app = angular.module('editor', []).config([
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