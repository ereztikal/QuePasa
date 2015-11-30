angular.module('QuePasa').filter('chatPicture', function($sce) {
    return function (chat) {
        if (!chat) {
            return;
        }

        var otherId = _.without(chat.userIds, Meteor.userId())[0];
        var otherUser = Meteor.users.findOne(otherId);
        var hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;

        return $sce.trustAsResourceUrl(hasPicture ? otherUser.profile.picture : chat.picture || '/user-default.svg');
    }
});