app.directive('stage', ['$compile', function($compile) {
    return {
        transclude : true,
        link: function($scope, $element, attrs, controller) {

            $scope.mouseX = 0;
            $scope.mouseY = 0

            $($element).bind('mousemove', function(e) {
                $scope.mouseX = e.offsetX;
                $scope.mouseY = e.offsetY;
            })

        }
    }
}])