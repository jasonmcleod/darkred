function CharacterCreateCtrl($scope, socket) {

    $scope.name = 'new character'
    $scope.error = false;

    $scope.create = function() {
        console.log('send create')

        $.post('/characters/create', {
            token:$scope.$parent.token,
            name:$scope.name
        }, function(data) {
            if(data.success==0) {
                $scope.error = 'That name is unavailable.'
            } else {
                $scope.$parent.creatingCharacter = false;

                $.get('/characters/list',{token:$scope.$parent.token}, function(data) {
                    $(document).trigger('characterList', {characters:data})
                })

            }
            $scope.$apply();
        })
    }

    $scope.cancel = function() {
        $scope.$parent.creatingCharacter = false;
    }

}