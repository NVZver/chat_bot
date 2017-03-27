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
                success: function (res) {
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
            }).done(function () {
                $scope.typing = false;
                updateScroll();

            });
            $('#message').focus();
            return;
        };

        $scope.inputKeypress = function (keyEvent) {
            if (keyEvent.which === 13) $scope.sendMessage();
        }

    })
})();