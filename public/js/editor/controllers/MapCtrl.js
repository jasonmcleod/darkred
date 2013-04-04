function MapCtrl($scope, socket, $rootScope, $location) {

    app.mapCtrl = $scope;

    $scope.socket = socket;
    $scope.tileSize = $scope.$parent.tileSize;

    // $scope.players = {};
    // $scope.npcs = []
    // $scope.socketEvents = new SocketEvents($scope, socket)

    $scope.setCamera = function(x,y) {
        $scope.camera.x = x
        $scope.camera.y = y
        $scope.renderer.renderBuffer(x,y)
        $scope.renderer.render(x,y);
    }

    $scope.moveCamera = function(x,y) {
        $scope.camera.x -= x
        $scope.camera.y -= y
        $scope.renderer.renderBuffer($scope.camera.x,$scope.camera.y)
        $scope.renderer.render($scope.camera.x,$scope.camera.y);
    }


    // loads the map
    $scope.mapParser = new MapParser({
        map:'/assets/maps/losteden40.json',
        assetsPath:'/assets/tilesets/',
        tileSize:$scope.tileSize,
        callback:function(map, layers, tileset) {

            // follows the player
            $scope.camera = new Camera({
                tileSize:$scope.tileSize,
                width:20,
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
            $scope.renderer.renderBuffer(0,0)
            $scope.renderer.render(0,0);

            $scope.map = map;
            $scope.layers = layers;
            $scope.tileset = tileset;

            document.getElementById('stage').appendChild($scope.renderer.finalCanvas).setAttribute('id','final')
            if(debugging) document.getElementById('stage').appendChild($scope.renderer.stageCanvas).setAttribute('id','stage')
            if(debugging) document.getElementById('stage').appendChild($scope.renderer.bufferCanvas).setAttribute('id','buffer')

            // $scope.bindings = new BindingsManager($scope)

            $(document).trigger('gameready', $scope)

        }
    });

}