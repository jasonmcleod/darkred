function CharactersCtrl($scope, socket, $rootScope, $location) {

    CHARS = $scope;

    $scope.selectCharacter = function() {
        $rootScope.name = $scope.characters[this.$index].name
        // console.log('selected ' + $scope.characters[this.$index].name, $scope.characters[this.$index])
        socket.emit('join', {name:$scope.name})
        $scope.$parent.characterSelected = true
    }

    $(document).on('characterList', function(e, data) {
        $scope.characters = data.characters.map(function(d) { return new Character(d)})
        $scope.$apply();
    })

}