angular.module('chicks')
    .factory('EventModel', ['$facebook', function ($facebook) {
        return {
            eventsAttending: function () {
                return $facebook.api('/me/events/attending');
            }
        }
    }]);