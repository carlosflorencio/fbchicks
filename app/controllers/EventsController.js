angular.module('chicks')
    .controller('EventsController', ['$scope', 'EventModel', function ($scope, $model) {
        $scope.events = [];

        $model.eventsAttending().then(function (result) {
            $scope.events = result.data;
        });
    }]);