function LoginCtrl($scope, socket, $rootScope, $location) {

    $scope.username = 'foo'
    $scope.password = 'foo'

    $scope.login = function() {
        console.log('connect')
        $.post('/auth/', {email:$scope.email, password:$scope.password}, function(data) {
            if(data.success==1) {
                $scope.$parent.loggedIn = true
                $(document).trigger('characterList', {characters:data.characters})
            } else {
                $scope.error = 'Invalid login'
            }
            $scope.$apply();
        })
        // socket.emit('login', {username:$scope.username, password:$scope.password})

    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }

    socket.on('login', function() {
        console.log(arguments)
    })
}