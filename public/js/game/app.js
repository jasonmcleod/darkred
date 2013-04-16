'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.directives']).config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    }
]);

var cursorX, cursorY;
var debugging = false


var config = {
    sounds:false
}

$(function() {
    $(window).bind('mousemove',function(e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
    })
})

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};