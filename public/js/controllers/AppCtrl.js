function AppCtrl($scope, socket) {

    // shortcut to alter anything
    $scope.set = function(v, d) { $scope[v] = d; }

    $scope.players = [];
    $scope.loggedIn = false;

    $scope.socketEvents = new SocketEvents($scope, socket)

    // socket.on('news', function (data) {
    //   $scope.name = data.name;
    //   $scope.users = data.users;
    // });

    $scope.$watch('instanceData', function(data, old) {
        console.log(arguments)
        $scope.players = data.players;
    })

    socket.emit('hi', {yay:'!'})
}