(function () {
    console.log('test');
    var chatApp = angular.module('chatApp', []);

    chatApp.controller('chatCtl', function ($scope, $http) {
        $scope.messages = [];
        $scope.message = "";

        $scope.sendMessage = function () {
            $scope.messages.push({
                sender: 'User',
                type: 'message',
                text: $scope.message
            });
            $.ajax({
                type: 'POST',
                url: '/send/',
                dataType: "json",
                data: {
                    user: 'Random user',
                    message: $scope.message
                },
                success: function (res) {
                    $scope.$apply(function () {
                        $scope.messages.push({
                            sender: 'Server',
                            type: 'server-message',
                            text: res.message
                        });
                    });

                }
            });
            $scope.message = "";
            $('#message').focus();
        };

        $scope.inputKeypress = function (keyEvent) {
            if (keyEvent.which === 13) $scope.sendMessage();
        }

    })
})();