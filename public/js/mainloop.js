function tests($scope) {

    // // test drawing a moving an item
    var sprite = new createjs.Shape();
    sprite.graphics.beginFill('#FF0000').drawRect(0,0,16,16)
    sprite.globalx = 100;
    sprite.globaly = 100;

    $scope.renderer.stage.add(sprite);
    $scope.renderer.easelStage.update();

    SCOPE = $scope
    setInterval(function() {
        sprite.globalx+=.75
        sprite.globaly+=.75
        $scope.renderer.easelStage.update();

        $scope.camera.x+=1;
        $scope.camera.y+=1;

        $scope.renderer.renderBuffer($scope.camera.x,$scope.camera.y)
        $scope.renderer.render($scope.camera.x, $scope.camera.y);
    },10)

}

$(function() {
    $(document).live('gameready', function(e, $scope){
        tests($scope)
    })
})