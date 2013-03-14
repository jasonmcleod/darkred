function AccountCreateCtrl($scope, socket) {

    $scope.error = false;
    $scope.success = false;

    $scope.create = function() {

        if($scope.password != $scope.passwordConfirm) { $scope.error = 'Passwords don\'t match'; return false; }

        $.post('/accounts/create', {
            email:$scope.email,
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
        $scope.$parent.creatingAccount = false;
    }

}
