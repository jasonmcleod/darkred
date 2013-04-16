app.directive('arcMeter', ['$compile', function($compile) {
    return {
        transclude : true,
        link: function($scope, $element, attrs, controller) {

            $scope.$watch($element.attr('ng-model'), function(n, o) {
                $({val:o||0}).stop().animate({val:n},{
                    step:function(now) {
                        $($element).val(now).trigger('change')
                    },
                    duration:200
                })
            })

            $($element).knob({
                readOnly:true,
                draw : function () {

                    var a = this.angle(this.cv)  // Angle
                    var sa = this.startAngle          // Previous start angle
                    var sat = this.startAngle         // Start angle
                    var ea                            // Previous end angle
                    var eat = sat + a                 // End angle
                    var r = 1;
                    this.g.lineWidth = this.lineWidth;
                    this.o.cursor
                    && (sat = eat - 0.3)
                    && (eat = eat + 0.3);
                    if (this.o.displayPrevious) {
                        ea = this.startAngle + this.angle(this.v);
                        this.o.cursor
                        && (sa = ea - 0.3)
                        && (ea = ea + 0.3);
                        this.g.beginPath();
                        this.g.strokeStyle = this.pColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                        this.g.stroke();
                    }
                    this.g.beginPath();
                    this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                    this.g.stroke();
                    this.g.lineWidth = 2;
                    this.g.beginPath();
                    this.g.strokeStyle = this.o.fgColor;
                    this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                    this.g.stroke();
                    return false;
                }
            });
        }
    }
}])



