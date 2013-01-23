function AppCtrl($scope, socket) {

    $scope.players = [];

    $scope.loggedIn = false

    socket.on('news', function (data) {
      $scope.name = data.name;
      $scope.users = data.users;
    });

    socket.emit('hi', {yay:'!'})
}