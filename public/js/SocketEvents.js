function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {
        console.log(data)
        $scope.set('instanceData',data.instance)

        $scope.me.handleInitialData(data.instance.players[data.me])
    });

    socket.on('players', function(data) {
        $scope.set('players',data)
    })

    socket.on('')
}