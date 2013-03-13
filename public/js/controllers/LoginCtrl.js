function LoginCtrl($scope, socket, $rootScope, $location) {

    $scope.email = 't@t.com'
    $scope.password = 'test'

    $scope.login = function() {
        $.post('/auth/', {email:$scope.email, password:$scope.password}, function(data) {
            if(data.success==1) {
                $scope.$parent.loggedIn = true
                $(document).trigger('characterList', {characters:data.characters})
                $scope.$parent.token = data.token;
            } else {
                $scope.error = 'Invalid login'
            }
            $scope.$apply();
        })
    }

    $scope.create = function() {
        $scope.$parent.creatingAccount = true
    }

    socket.on('login', function() {
        console.log(arguments)
    })
}