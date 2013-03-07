function mainloop($scope) {

    if(key.isPressed("W") || key.isPressed(38)) $scope.me.moveBy({y:-4})
    if(key.isPressed("S") || key.isPressed(40)) $scope.me.moveBy({y:4})

    if(key.isPressed("A") || key.isPressed(37)) $scope.me.moveBy({x:-4})
    if(key.isPressed("D") || key.isPressed(49)) $scope.me.moveBy({x:4})
}

$(function() {
    $(document).live('gameready', function(e, $scope){
        setInterval(mainloop,15,$scope)
    })
})