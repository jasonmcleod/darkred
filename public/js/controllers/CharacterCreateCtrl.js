function CharacterCreateCtrl($scope, socket) {

    $scope.name = 'new character'

    $scope.create = function() {
        console.log('send create')
    }

    $scope.cancel = function() {
        $scope.$parent.creatingCharacter = false;
    }

}