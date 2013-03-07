function bootstrapBindings() {
    $(document).bind('mousemove', function(e) {
        // crosshair.sprite.x = e.offsetX - 10;
        // crosshair.sprite.y = e.offsetY - 10;
        var deltaX = (e.offsetX) - (SCOPE.camera.width * SCOPE.tileSize) / 2
        var deltaY = (e.offsetY) - (SCOPE.camera.height * SCOPE.tileSize) / 2
        ME.setRotation(Math.atan2(deltaY, deltaX) / Math.PI * 180);
    })
}