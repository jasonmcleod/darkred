function GameCtrl($scope, socket, $rootScope, $location) {

    $scope.set = function(v, d) { $scope[v] = d; }

    $scope.tileSize = 16;
    $scope.players = [];
    $scope.me = Player.extend({name:'Me', socket:socket, x:100, y:100});
    $scope.me.join();

    $scope.socketEvents = new SocketEvents($scope, socket)
    ME = $scope.me;

    // loads the map
    $scope.mapParser = new MapParser({
        map:'/assets/maps/level2.json',
        assetsPath:'/assets/tilesets/',
        tileSize:$scope.tileSize,
        callback:function(map, tileset) {

            // follows the player
            $scope.camera = new Camera({
                tileSize:$scope.tileSize,
                width:31,
                height:29,
                x:0,
                y:0
            });

            // renders everything onto a canvas
            $scope.renderer = new Renderer({
                map:map,
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

            $(document).trigger('gameready', $scope)



        }
    });

}