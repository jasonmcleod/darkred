function NpcManager($scope, socket) {
    // socket.on('playerJoin', function(data) {
    //     data.$scope = $scope;
    //     $scope.players[data.id] = new Player(data)
    //     $scope.players[data.id].addToStage();
    // })
    //
    // socket.on('playerDrop', function(data) {
    //     if($scope.players[data.id]) {
    //         $scope.players[data.id].drop()
    //         delete $scope.players[data.id]
    //     }
    // })

    socket.on('npcMove', function(data) {
        // console.log(JSON.stringify(data))
        if($scope.npcs[data.id]) $scope.npcs[data.id].update(data)
    })
}