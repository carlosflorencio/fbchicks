angular.module('chicks')
    .controller('UserController', ['$scope', 'UserModel', function ($scope, $model) {
        $scope.user = [];

        $model.info().then(function (result) {
            $scope.user = result;
        });
    }]);