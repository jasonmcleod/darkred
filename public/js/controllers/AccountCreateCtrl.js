function AccountCreateCtrl($scope, socket) {

    $scope.name = 'new character'
    $scope.error = false;
    $scope.success = false;

    $scope.create = function() {
        //$scope.error = 'email already registered'
        $scope.success = true
        console.log('send create')
    }

    $scope.cancel = function() {
        $scope.$parent.creatingAccount = false;
    }

    $scope.returnToLogin = function() {
        $scope.$parent.creatingAccount = false;
    }

}
