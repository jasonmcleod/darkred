function AppCtrl($scope, socket) {
    ROOT = $scope;

    $scope.hash = function(str) {
      return (window.location.hash.indexOf("#" + str)>-1 || window.location.hash.indexOf("#/" + str) > -1)
    }

    $scope.tileSize = 40;
    $scope.scale = .5;
    $scope.$watch('scale', function(n) {
        $('#zoom canvas').css('-webkit-transform','scale(' + n +')')
    })

    $scope.setCamera = function(x,y) {
        $scope.camera.x = x;
        $scope.camera.y = y

    }
}