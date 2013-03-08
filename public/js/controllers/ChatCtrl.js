function ChatCtrl($scope, socket) {

    $scope.messages = [];
    $scope.input = '';

    // out
    $scope.sendMessage = function() {
        if($scope.input<='') return
        socket.emit('chat', {text:$scope.input});
        $scope.input = ''
        return false;
    };

    $scope.$watch('messages', function() {
        if($scope.messages.length > 5) $scope.messages.splice(0,1)
    },true)

    $scope.manager = new ChatManager($scope, socket)

}
