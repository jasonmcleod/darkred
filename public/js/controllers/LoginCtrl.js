function LoginCtrl($scope, socket, $rootScope, $location) {

    $scope.username = 'foo'
    $scope.password = 'foo'

    $scope.login = function() {
        console.log('connect')
        socket.emit('connect', {username:$scope.username, password:$scope.password})
        // $scope.$parent.loggedIn = true
        $rootScope.loggedIn = true
        $location.path('/characters')
    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }
}