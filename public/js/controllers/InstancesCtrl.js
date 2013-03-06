function InstancesCtrl($scope, socket, $rootScope, $location) {
    $scope.instances = [
        {name:'Herp', players:23},
        {name:'Derp', players:13}
    ]

    $scope.selectInstance = function() {
        console.log(this.$index)
        $location.path('/game')
    }
}

