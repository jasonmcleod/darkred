function AccountCreateCtrl($scope, socket) {

    // $scope.creating = false;
    $scope.name = 'new character'

    // $(document).on('account-create', function() { $scope.creating = true; })

    $scope.create = function() {
        console.log('send create')
    }

    $scope.cancel = function() {
        $scope.$parent.creatingAccount = false;
    }

}
