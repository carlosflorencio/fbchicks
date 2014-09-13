angular.module('chicks')
    .controller('HomeController', [
        '$scope',
        'EventModel',
        'UserModel',
        '$http',
        function ($scope, $EventModel, $UserModel, $http) {
            $scope.main = {
                page: 1,
                take: 5
            };

            $scope.events = [];
            $scope.paging = [];

            $EventModel.eventsAttending($scope.main.take).then(function (result) {
                $scope.events = result.data;
                console.log(result.data);
                $scope.paging = result.paging;
                console.log(result.paging);
            });

            $scope.loadPage = function (url) {
                $http.get(url).success(function (res) {
                    if (res.data.length > 0) {
                        $scope.events = res.data;
                        $scope.paging = res.paging;
                    }
                });
            };

            $scope.nextPage = function () {
                if ($scope.paging.next) {
                    $scope.main.page++;
                    $scope.loadPage($scope.paging.next);
                }
            };

            $scope.previousPage = function () {
                if ($scope.main.page > 1 && $scope.paging.previous) {
                    $scope.main.page--;
                    $scope.loadPage($scope.paging.previous);
                }
            };

            $scope.user = [];

            $UserModel.info().then(function (result) {
                $scope.user = result;
                console.log(result);
            });
        }]);