function PlayerManager($scope, socket) {
    socket.on('playerJoin', function(data) {
        data.$scope = $scope;
        $scope.players[data.id] = new Player(data)
        $scope.players[data.id].addToStage();
    })

    socket.on('playerDrop', function(data) {
        if($scope.players[data.id]) {
            $scope.players[data.id].drop()
            delete $scope.players[data.id]
        }
    })

    socket.on('playerMove', function(data) {
        $scope.players[data.id].update(data)
    })
}