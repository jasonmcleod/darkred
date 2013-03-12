function LoginCtrl($scope, socket, $rootScope, $location) {

    $scope.email = 't@t.com'
    $scope.password = 'test'

    $scope.login = function() {
        $.post('/auth/', {email:$scope.email, password:$scope.password}, function(data) {
            if(data.success==1) {
                $scope.$parent.loggedIn = true
                $(document).trigger('characterList', {characters:data.characters})
            } else {
                $scope.error = 'Invalid login'
            }
            $scope.$apply();
        })
    }

    $scope.validate = function() {
        if($scope.username === undefined || $scope.password === undefined) return false
        return $scope.username.length >=3 && $scope.password.length >=3
    }

    socket.on('login', function() {
        console.log(arguments)
    })
}