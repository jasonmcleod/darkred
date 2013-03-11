function AppCtrl($scope, socket) {

    // shortcut to alter anything
    $scope.loggedIn = false;
    $scope.characterSelected = false;

    socket.emit('hi', {yay:'!'})
}