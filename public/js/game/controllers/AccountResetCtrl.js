function AccountResetCtrl($scope, socket) {

    var passwordCode = (window.location+'').split('reset/')[1]

    $scope.error = false;
    $scope.success = false;

    $scope.password='b'
    $scope.passwordConfirm='b'

    $scope.reset = function() {

        if($scope.password != $scope.passwordConfirm) { $scope.error = 'Passwords don\'t match'; return false; }

        $.post('/accounts/reset', {
            passwordCode:passwordCode,
            password:$scope.password
        },function(data) {
            if(data.success == 1) {
                $scope.success = true
            } else {
                $scope.error = data.error
            }
            $scope.$apply();
        })
    }

    $scope.cancel = function() {
        $scope.$parent.creatingAccount = false;
    }

    $scope.returnToLogin = function() {
        $scope.$parent.resettingAccount = false
    }

}
