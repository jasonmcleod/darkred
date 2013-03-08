function ChatCtrl($scope, socket) {

    $scope.messages = [];
    $scope.input = '';

    // out
    $scope.sendMessage = function() {
        socket.emit('chat', {text:$scope.input});
        $scope.input = ''
    };

    $scope.manager = new ChatManager($scope, socket)

}
