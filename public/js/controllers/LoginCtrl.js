function LoginCtrl($scope, socket) {

    $scope.login = function() {
        console.log('connect')
    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }

}