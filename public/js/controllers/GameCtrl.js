function GameCtrl($scope, socket, $rootScope, $location) {

    $scope.set = function(v, d) { $scope[v] = d; }
    $scope.setPlayers = function(data) {
        console.log(data)
        $scope.players = data
        console.log($scope.players)
    }

    // tile size (square tiles)
    $scope.tileSize = 16;
    $scope.players = [];
    $scope.me = Player.extend({name:'Me', socket:socket});
    $scope.me.join();

    $scope.socketEvents = new SocketEvents($scope, socket)

    // socket.on('news', function (data) {
    //   $scope.name = data.name;
    //   $scope.users = data.users;
    // });
    //
    // $scope.$watch('instanceData', function(data, old) {
    //     if(data===undefined) return
    //     console.log(arguments)
    //     $scope.players = data.players;
    // })

    ME = $scope.me;


    // $scope.me.fire();
    // $scope.$watch('me.name', function() { console.log(arguments) },true);
    // $scope.changeName = function() { $scope.me.name='test2' };

    // loads the map
    $scope.mapParser = new MapParser({
        map:'/assets/maps/level2.json',
        assetsPath:'/assets/tilesets/',
        tileSize:$scope.tileSize,
        callback:function(map, tileset) {

            // follows the player
            $scope.camera = new Camera({
                tileSize:$scope.tileSize,
                width:19,
                height:19
            });

            // renders everything onto a canvas
            $scope.renderer = new Renderer({
                map:map,
                tileSize:$scope.tileSize,
                camera:$scope.camera,
                tileset:tileset
            });

            $scope.map = map;
            $scope.tileset = tileset;

            document.getElementById('stage').appendChild($scope.renderer.stageCanvas)
            document.getElementById('stage').appendChild($scope.renderer.bufferCanvas)

            var me = {
                x:150,
                y:150
            }

            // setInterval(function() {
            //     // me.x++
            //     // me.y++
            //
            //     me.x = cursorX
            //     me.y = cursorY
            //     $scope.camera.x = Math.floor(me.x/$scope.tileSize) - Math.floor(($scope.camera.width)/2);
            //     $scope.camera.y = Math.floor(me.y/$scope.tileSize) - Math.floor(($scope.camera.height)/2);
            //
            //     $scope.renderer.renderBuffer(me.x,me.y)
            //     $scope.renderer.render(me.x, me.y);
            // },5)

            // // test drawing a moving an item
            // var sprite = new createjs.Shape();
            // sprite.graphics.beginFill('#FF0000').drawRect(0,0,16,16)
            // sprite.x = 200;
            // sprite.y = 200;
            //
            // $scope.renderer.stage.add(sprite);

            // setInterval(function() {
            //     sprite.x++
            //     sprite.y++
            //     $scope.renderer.easelStage.update();
            // },10)
        }
    });

}