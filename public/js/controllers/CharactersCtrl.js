function CharactersCtrl($scope, socket, $rootScope, $location) {

    console.log(arguments)

    if(!$rootScope.loggedIn) $location.path('/login')

    $scope.characters = [
        {name:'Jeezle', id:1,   level:2,    dex:1,  str:2,  con:3,  int:4},
        {name:'Sns',    id:2,   level:12,   dex:1,  str:2,  con:3,  int:4},
    ]

    $scope.selectCharacter = function() {
        $rootScope.name = $scope.characters[this.$index].name
        console.log('selected ' + $scope.characters[this.$index].name, $scope.characters[this.$index])
        $location.path('/game')
    }

    $scope.addCharacter = function() {
        $scope.characters.push({name: 'test', level:1,dex:1,  str:2,  con:3,  int:4})
        $scope.formNewCharacterName = ''
    }

}