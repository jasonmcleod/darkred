app.directive('dragMap', ['$compile', function($compile) {
    return {
        link: function($scope, $element, attrs, controller) {

            var $elm = $($element);
            $element.css({position:'relative'})

            var $box = $('<div class="drag-map"></div>')
            $box.css({
                width:200,
                height:200
            })
            $($element).append($box)

            $box.draggable({
                containment:'parent',
                drag:function(e, ui) {
                    console.log(ui)
                    app.mapCtrl.setCamera(100 - ui.position.left, 100 - ui.position.top)
                }
            });
        }
    }
}])