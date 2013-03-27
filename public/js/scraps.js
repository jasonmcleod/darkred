function scraps($scope) {

    SCOPE = $scope;
    ME = $scope.me;

}

$(function() {
    $(document).live('gameready', function(e, $scope){
        scraps($scope)
    })
})
