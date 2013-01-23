function GameCtrl($scope, socket, $rootScope, $location) {

    $scope.renderer = new Renderer();

    document.getElementById('stage').appendChild($scope.renderer.canvas)


    var sprite = new createjs.Shape();
    sprite.graphics.beginFill('#FF0000').drawRect(0,0,16,16)
    sprite.x = 200;
    sprite.y = 200;

    $scope.renderer.stage.add(sprite);

    setInterval(function() {
        sprite.x++
        sprite.y++
        $scope.renderer.easelStage.update();
    },10)

}