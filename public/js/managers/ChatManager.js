function ChatManager($scope, socket) {
    socket.on('addChat', function(data) {
        $scope.messages.push({name:$scope.players[data.user].name, text:data.text});
    });
}