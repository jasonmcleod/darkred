function scraps($scope) {

    SCOPE = $scope;
    ME = $scope.me;

    // create a new shape
    var sprite = new createjs.Shape();
    sprite.graphics.beginFill('#FF0000').drawRect(0,0,16,16)
    sprite.globalx = 400;
    sprite.globaly = 400;
    $scope.renderer.stage.add(sprite);

    setInterval(function() {
        sprite.globalx+=.75
        sprite.globaly+=.75
        sprite.rotation+=1
    },10)

}

$(function() {
    $(document).live('gameready', function(e, $scope){
        scraps($scope)
    })
})
