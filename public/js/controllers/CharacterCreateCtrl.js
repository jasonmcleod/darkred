function CharacterCreateCtrl($scope, socket) {

    $scope.name = 'new character'

    // $(document).on('character-create', function() { $scope.creating = true; })

    $scope.create = function() {
        console.log('send create')
    }

    $scope.cancel = function() {
        $scope.$parent.creatingCharacter = false;
    }

}