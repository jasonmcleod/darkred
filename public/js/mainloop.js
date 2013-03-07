function mainloop($scope) {
    // bindings.monitorMovement($scope)
    $scope.bindings.monitorMovement();
}

$(function() {
    $(document).live('gameready', function(e, $scope){
        setInterval(mainloop,15,$scope)
    })
})