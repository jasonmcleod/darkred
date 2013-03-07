function BindingsManager($scope) {

    $(document).bind('mousemove', function(e) {
        var deltaX = (e.offsetX) - (SCOPE.camera.width * SCOPE.tileSize) / 2
        var deltaY = (e.offsetY) - (SCOPE.camera.height * SCOPE.tileSize) / 2
        $scope.me.setRotation(Math.atan2(deltaY, deltaX) / Math.PI * 180);
    })

    return {
        monitorMovement: function() {
            if(key.isPressed("W") || key.isPressed(38)) $scope.me.moveBy({y:-2})
            if(key.isPressed("S") || key.isPressed(40)) $scope.me.moveBy({y: 2})

            if(key.isPressed("A") || key.isPressed(37)) $scope.me.moveBy({x:-2})
            if(key.isPressed("D") || key.isPressed(49)) $scope.me.moveBy({x: 2})
        }
    }
}