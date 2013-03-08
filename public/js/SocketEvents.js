function SocketEvents($scope, socket) {

    socket.on('instance',function(data) {

        $scope.instance = data.instance

        $.each(data.instance.players, function(k,v) {
            v.$scope = $scope;
            $scope.players[k] = new Player(v);
            $scope.players[k].addToStage()
        })

        $scope.me = $.extend($scope.players[data.me], new LocalPlayer({$scope:$scope}));
        $scope.me.syncCamera();

    });

    // player messages
    new PlayerManager($scope, socket)

}