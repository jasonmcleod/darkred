function AppCtrl($scope, socket) {

    // shortcut to alter anything
    $scope.loggedIn = false;



    socket.emit('hi', {yay:'!'})
}