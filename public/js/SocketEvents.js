function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {
        $scope.set('instanceData',data)
    });

    socket.on('addPlayer', function(data) {
        console.log(data)
    })

    socket.on('')
}