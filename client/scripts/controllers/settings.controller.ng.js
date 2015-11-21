angular.module('QuePasa').controller('SettingsCtrl', function($scope, $meteor, $state) {
    $scope.logout = function() {
        $meteor.logout().then(function () {
            $state.go('login');
        });
    };
});