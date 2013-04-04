app.directive('grid', ['$compile', function($compile) {
    return {
        link: function($scope, $element, attrs, controller) {

            var $elm = $($element);
            $element.css({position:'relative'})

            var $box = $('<div class="grid-box"></div>')
            $($element).append($box)

            $($element).bind('mousemove', function(e) {
                $box.css({
                    width:$scope.$parent.tileSize * $scope.$parent.scale,
                    height:$scope.$parent.tileSize * $scope.$parent.scale,
                    top:(Math.floor(e.clientY / $scope.$parent.tileSize / $scope.$parent.scale) * $scope.$parent.tileSize * $scope.$parent.scale) - $scope.$parent.tileSize * $scope.$parent.scale,
                    left:(Math.floor(e.clientX / $scope.$parent.tileSize / $scope.$parent.scale) * $scope.$parent.tileSize * $scope.$parent.scale) - $scope.$parent.tileSize * $scope.$parent.scale
                })
            })

        }
    }
}])