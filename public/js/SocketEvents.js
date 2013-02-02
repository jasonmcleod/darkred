function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {
        $scope.set('instanceData',data)
    });

    socket.on('players', function(data) {
        $scope.setPlayers(data)
    })

    socket.on('')
}