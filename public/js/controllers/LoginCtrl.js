function LoginCtrl($scope, socket) {

    console.log(arguments)

    $scope.login = function() {
        console.log('connect')
        socket.emit('connect', {username:$scope.username, password:$scope.password})
        $scope.loggedIn = true
        // $scope.$broadcast('log-in')
    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }
}
// LoginCtrl.$inject = ['$scope', 'socket', 'shared']