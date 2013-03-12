function AppCtrl($scope, socket) {

    // shortcut to alter anything
    $scope.loggedIn = false;
    $scope.characterSelected = false;

    $scope.creatingCharacter = false;
    $scope.creatingAccount = false;

    socket.emit('hi', {yay:'!'})
}