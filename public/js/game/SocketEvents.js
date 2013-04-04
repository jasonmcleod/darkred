function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {

        console.log(data)

        $scope.game = data.game

        $.each(data.game.npcs, function(k,v) {
            console.log(v)
            v.$scope = $scope;
            $scope.npcs[k] = new Npc(v);
            $scope.npcs[k].addToStage()
        })

        $.each(data.game.players, function(k,v) {
            v.$scope = $scope;
            $scope.players[k] = new Player(v);
            $scope.players[k].addToStage()
        })

        $scope.me = $.extend($scope.players[data.me], new LocalPlayer({$scope:$scope}));
        $scope.me.syncCamera();

    });

    // player messages
    new PlayerManager($scope, socket)
    new NpcManager($scope, socket)

}