angular.module('QuePasa', ['angular-meteor', 'ionic', 'angularMoment', 'ngCordova']);

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
}
else {
    angular.element(document).ready(onReady);
}

function onReady() {
    angular.bootstrap(document, ['QuePasa']);
}