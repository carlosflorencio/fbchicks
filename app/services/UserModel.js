angular.module('chicks')
    .factory('UserModel', ['$facebook', function ($facebook) {
        return {
            info: function () {
                return $facebook.api('/me');
            }
        }
    }]);