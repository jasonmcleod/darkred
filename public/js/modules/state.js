var module = angular.module('state', ['ng']);

module.run(function($rootScope, $window) {
    angular.extend($rootScope, {
        loggedIn:false
    })
})