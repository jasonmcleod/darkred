function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {

        $scope.instance = data.instance

        $.each(data.instance.players, function(k,v) {
            v.$scope = $scope;
            $scope.players[k] = new Player(v);
            $scope.players[k].addToStage()
        })

        $scope.me = $.extend($scope.players[data.me], new LocalPlayer());
        $scope.me.syncCamera();

    });

    socket.on('playerJoin', function(data) {
        data.$scope = $scope;
        $scope.players[data.id] = new Player(data)
        $scope.players[data.id].addToStage();
    })

    socket.on('playerDrop', function(data) {
        $scope.players[data.id].drop()
        delete $scope.players[data.id]
    })


    socket.on('moved', function(data) {
        $scope.players[data.id].update(data)
    })

}