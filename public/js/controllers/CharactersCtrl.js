function CharactersCtrl($scope, socket) {

    $scope.characters = [
        {name:'Jeezle', level:2,    dex:1,  str:2,  con:3,  int:4},
        {name:'Sns',    level:12,   dex:1,  str:2,  con:3,  int:4},
    ]

    $scope.totalCharacters = function() {
        return $scope.characters.length
    }

    $scope.addCharacter = function() {
        $scope.characters.push({name: $scope.formNewCharacterName, level:1,dex:1,  str:2,  con:3,  int:4})
        $scope.formNewCharacterName = ''
    }

}