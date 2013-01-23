function LoginCtrl($scope, socket, $rootScope) {

    $scope.login = function() {
        console.log('connect')
        socket.emit('connect', {username:$scope.username, password:$scope.password})
        $scope.$parent.loggedIn = true

    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }
}