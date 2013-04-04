function BindingsManager($scope) {

    $(document).bind('mousemove', function(e) {
        if(!$scope.me) return
        var deltaX = (e.offsetX) - ($scope.camera.width *  $scope.tileSize) / 2
        var deltaY = (e.offsetY) - ($scope.camera.height * $scope.tileSize) / 2
        $scope.me.moveBy({rotation:Math.atan2(deltaY, deltaX) / Math.PI * 180});
    })

    return {
        monitorMovement: function() {
            if($('input:focus').length>0) return
            if(key.isPressed("W") || key.isPressed(38)) $scope.me.moveBy({y:-2})
            if(key.isPressed("S") || key.isPressed(40)) $scope.me.moveBy({y: 2})

            if(key.isPressed("A") || key.isPressed(37)) $scope.me.moveBy({x:-2})
            if(key.isPressed("D") || key.isPressed(39)) $scope.me.moveBy({x: 2})
        }
    }
}