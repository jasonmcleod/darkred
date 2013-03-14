function AppCtrl($scope, socket) {

    if(window.location.hash=="#activation-failed") { $scope.error = 'Invalid activation link' }
    if(window.location.hash=="#activation") { $scope.notice = 'Activation successful! Login below!' }

    // shortcut to alter anything
    $scope.loggedIn = false;
    $scope.characterSelected = false;

    $scope.creatingCharacter = false;
    $scope.creatingAccount = false;

    socket.emit('hi', {yay:'!'})
}