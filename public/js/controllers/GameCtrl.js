function GameCtrl($scope, socket, $rootScope, $location) {

    // tile size (square tiles)
    $scope.tileSize = 16;

    // loads the map
    $scope.mapParser = new MapParser({
        map:'/assets/maps/level2.json',
        assetsPath:'/assets/tilesets/',
        tileSize:$scope.tileSize,
        callback:function(map, tileset) {

            // follows the player
            $scope.camera = new Camera({
                tileSize:$scope.tileSize,
                width:39,
                height:31,
                x:10,
                y:10
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

            // $scope.renderer.renderBuffer(0,0)
            $scope.renderer.render();

            setInterval(function() {
                $scope.camera.x++;
                $scope.camera.y++;
                $scope.renderer.renderBuffer(0,0)
                $scope.renderer.render();
            },200)

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