function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {
        $scope.set('instanceData',data)
    });

    socket.on('players', function(data) {
        $scope.set('players',data)
    })

    socket.on('')
}