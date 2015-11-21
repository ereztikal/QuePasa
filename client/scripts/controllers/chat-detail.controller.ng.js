angular.module('QuePasa').controller('ChatDetailCtrl', function ($scope, $stateParams, $ionicScrollDelegate, $timeout, $meteor, $ionicPopup, $log) {
    var chatId = $stateParams.chatId;
    var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.chat = $scope.$meteorObject(Chats, chatId, false);
    $scope.data = {};
    $scope.messages = $scope.$meteorCollection(function () {
        return Messages.find({ chatId: chatId });
    }, false);

    $scope.$watchCollection('messages', function (oldVal, newVal) {
        var animate = oldVal.length !== newVal.length;
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
    });

    $scope.sendMessage = function () {
        if (_.isEmpty($scope.data.message)) {
            return;
        }

        $meteor.call('newMessage', {
            text: $scope.data.message,
            type: 'text',
            chatId: chatId
        });

        delete $scope.data.message;
    };

    $scope.inputUp = function () {
        if (isIOS) {
            $scope.data.keyboardHeight = 216;
        }

        $timeout(function() {
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        }, 300);
    };

    $scope.inputDown = function() {
        if (isIOS) {
            $scope.data.keyboardHeight = 0;
        }

        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    };

    $scope.closeKeyboard = function() {
        // cordova.plugins.Keyboard.close();
    };

    $scope.sendPicture = function() {
        MeteorCameraUI.getPicture({}, function (err, data) {
            if (err && err.error == 'cancel') {
                return;
            }
            if (err) {
                return handleError(err);
            }

            $meteor.call('newMessage', {
                picture: data,
                type: 'picture',
                chatId: chatId
            });
        });
    };

    function handleError (err) {
        $log.error('profile save error ', err);
        $ionicPopup.alert({
            title: err.reason || 'Save failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
});