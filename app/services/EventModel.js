angular.module('chicks')
    .factory('EventModel', ['$facebook', function ($facebook) {
        return {
            eventsAttending: function ($limit) {
                var url = '/me/events/attending?limit=' + $limit + '&since=' + Math.round(+new Date()/1000); //unix timestamp in seconds
                return $facebook.api(url);
            }
        }
    }]);