function tests($scope) {

    // create a new shape
    var sprite = new createjs.Shape();
    sprite.graphics.beginFill('#FF0000').drawRect(0,0,16,16)
    sprite.globalx = 100;
    sprite.globaly = 100;

    // add it to the stage
    $scope.renderer.stage.add(sprite);

    setInterval(function() {
        sprite.globalx+=.75
        sprite.globaly+=.75
        $scope.renderer.easelStage.update();

        $scope.camera.x+=1;
        $scope.camera.y+=1;

    },5)

}

$(function() {
    $(document).live('gameready', function(e, $scope){
        tests($scope)
    })
})