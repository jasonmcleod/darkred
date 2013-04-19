function LoginCtrl($scope, socket, $rootScope, $location) {

    $scope.email = 'tests'
    $scope.password = 'tests'

    $scope.login = function() {
        $.post('/auth/', {email:$scope.email, password:$scope.password}, function(data) {
            if(data.success==1) {
                $scope.$parent.loggedIn = true

                $.get('/characters/list', {token: data.token}, function(data) {
                    $(document).trigger('characterList', {characters:data})
                })

                $scope.$parent.token = data.token;
            } else {
                $scope.error = data.error
                $scope.notice = false
            }
            $scope.$apply();
        })
    }

    $scope.create = function() {
        $scope.$parent.creatingAccount = true
    }

    $scope.forgot = function() {
        $.get('/accounts/forgot',{email:$scope.email || prompt('Enter your email address')},function(data) {
            if(data.success==1) {
                $scope.notice = 'Check your email to reset your password'
                $scope.$apply();
            } else {
                $scope.error = data.error
                $scope.$apply();
            }
        })
    }

    socket.on('login', function() {
        console.log(arguments)
    })
}