function CharactersCtrl($scope, socket, $rootScope, $location) {

    CHARS = $scope;

    $scope.selectCharacter = function() {
        socket.emit('join', {character:$scope.characters[this.$index].id, token:$scope.$parent.token})
    }

    $scope.create = function() {
        $scope.$parent.creatingCharacter = true
    }

    $(document).on('characterList', function(e, data) {
        console.log(data)
        if(data.characters.length > 0) {
            $scope.characters = data.characters.map(function(d) { return new Character(d)})
            $scope.$apply();
        }
    })

    socket.on('join-fail', function() {
        $scope.error = 'Unable to join game.'
    })

    socket.on('join-success', function() {
        $scope.$parent.characterSelected = true
    })

}