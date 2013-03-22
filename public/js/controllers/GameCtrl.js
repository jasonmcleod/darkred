function GameCtrl($scope, socket, $rootScope, $location) {

    $scope.set = function(v, d) { $scope[v] = d; }

    $scope.socket = socket;
    $scope.tileSize = 20;
    $scope.players = {};
    $scope.socketEvents = new SocketEvents($scope, socket)

    // loads the map
    $scope.mapParser = new MapParser({
        map:'/assets/maps/losteden.json',
        assetsPath:'/assets/tilesets/',
        tileSize:$scope.tileSize,
        callback:function(map, layers, tileset) {

            // follows the player
            $scope.camera = new Camera({
                tileSize:$scope.tileSize,
                width:30,
                height:20,
                x:0,
                y:0
            });

            // renders everything onto a canvas
            $scope.renderer = new Renderer({
                map:map,
                layers:layers,
                width:$scope.tileSize * ($scope.camera.width+1),
                height:$scope.tileSize * ($scope.camera.height+1),
                tileSize:$scope.tileSize,
                camera:$scope.camera,
                tileset:tileset
            })

            // start the renderloop
            $scope.renderer.start();

            $scope.map = map;
            $scope.tileset = tileset;

            document.getElementById('stage').appendChild($scope.renderer.finalCanvas).setAttribute('id','final')
            if(debugging) document.getElementById('stage').appendChild($scope.renderer.stageCanvas).setAttribute('id','stage')
            if(debugging) document.getElementById('stage').appendChild($scope.renderer.bufferCanvas).setAttribute('id','buffer')

            $scope.bindings = new BindingsManager($scope)

            $(document).trigger('gameready', $scope)

        }
    });

}