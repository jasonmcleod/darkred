function AppCtrl($scope, socket) {

    $scope.hash = function(str) {
    	return (window.location.hash == "#" + str || window.location.hash == "#/" + str)
    }

    if($scope.hash("activation-failed")) { $scope.error = 'Invalid activation link' }
    if($scope.hash("activated")) { $scope.notice = 'Activation successful! Login below!' }

    // shortcut to alter anything
    $scope.loggedIn = false;
    $scope.characterSelected = false;

    $scope.creatingCharacter = false;
    $scope.creatingAccount = false;

    socket.emit('hi', {yay:'!'})
}