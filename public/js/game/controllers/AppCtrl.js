function AppCtrl($scope, socket) {
    ROOT = $scope;

    $scope.hash = function(str) {
      return (window.location.hash.indexOf("#" + str)>-1 || window.location.hash.indexOf("#/" + str) > -1)
    }

    $scope.loggedIn = false;
    $scope.characterSelected = false;
    $scope.resettingAccount = false;

    $scope.creatingCharacter = false;
    $scope.creatingAccount = false;

    if($scope.hash("activation-failed")) { $scope.error = 'Invalid activation link' }
    if($scope.hash("activated")) { $scope.notice = 'Activation successful! Login below!' }
    if($scope.hash("reset")) { $scope.resettingAccount = true; }

}