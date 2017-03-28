(function () {
    console.log('test');
    var chatApp = angular.module('chatApp', []);

    chatApp.controller('chatCtl', function ($scope, $http) {
        $scope.messages = [];
        $scope.message = "";
        $scope.typing = false;

        function updateScroll() {
            var element = document.getElementById("items");
            element.scrollTop = element.scrollHeight;
        }

        $scope.sendMessage = function (type) {
            type = type || 'typing';

            if (type == 'typing') {
                $scope.messages.push({
                    sender: 'User',
                    type: 'message',
                    text: $scope.message
                });
            }

            $.ajax({
                type: 'POST',
                url: '/send/',
                dataType: "json",
                data: {
                    user: 'Random user',
                    type: type,
                    message: $scope.message
                },
                success: setMessage
            }).done(function () {
                $scope.typing = false;
                updateScroll();
            });
            $('#message').focus();
            return;
        };

        function setMessage(res) {
            $scope.$apply(function () {
                if (res.type == 'typing') {
                    $scope.typing = true;
                    setTimeout(function () {
                        $scope.sendMessage('message')
                    }, 2000);
                } else {
                    $scope.messages.push({
                        sender: 'Server',
                        type: 'server-message',
                        text: res.message
                    });
                    $scope.message = "";

                }
            });

        }

        $scope.inputKeypress = function (keyEvent) {
            if (keyEvent.which === 13) $scope.sendMessage();
        }

    })
})();