function CharactersCtrl($scope, socket, $rootScope, $location) {

    if(!$rootScope.loggedIn) $location.path('/login')

    $scope.selectCharacter = function() {
        $rootScope.name = $scope.characters[this.$index].name
        // console.log('selected ' + $scope.characters[this.$index].name, $scope.characters[this.$index])
        socket.emit('join', {name:$scope.name})
        $scope.$parent.characterSelected = true
    }

    socket.on('characters', function(data) {
        $scope.characters = data.characters
    })

}