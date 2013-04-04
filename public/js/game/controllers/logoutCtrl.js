function LogoutCtrl($scope, socket) {

    $scope.logout = function() {
        console.log('disconnect')
        $scope.$parent.loggedIn = false
    }
}