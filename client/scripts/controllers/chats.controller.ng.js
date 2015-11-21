angular.module('QuePasa').controller('ChatsCtrl', function($scope, $ionicModal, $meteor) {
    $scope.chats = $scope.$meteorCollection(Chats, false);

    $ionicModal.fromTemplateUrl('client/templates/new-chat.ng.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.remove = function (chat) {
        $meteor.call('removeChat', chat._id);
    };

    $scope.openNewChatModal = function() {
        $scope.modal.show();
    };
});