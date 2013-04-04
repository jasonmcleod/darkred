app.directive('chatInput', ['$compile', function($compile) {
    return {
        transclude : true,
        link: function($scope, $element, attrs, controller) {
            var $elm = $($element);

            $(document).bind('keyup', function(e) {
                if(e.keyCode==13) {
                    if($elm.is(':focus')) {
                        $scope.sendMessage();
                        $elm.blur()
                    } else {
                        $elm.focus();
                    }
                }
            })

        }
    }
}])