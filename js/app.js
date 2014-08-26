(function(){
    var app = angular.module('chicks', ['facebook']);
    var logged = false;

    app.config(['$facebookProvider', function($facebookProvider) {
        $facebookProvider.init({
            appId: '1465096787107378',
            channel: '//path/to/channel.html'
        });
    }]);

    app.run(['$facebook', function($facebook) {
        fbStatus($facebook);
    }]);

    app.controller('ChicksController', ['$facebook', function($facebook) {
        this.teste = 2;

        $facebook.api('/me', {fields: 'last_name'}, function(response) {
            console.log(response);
        });

    }]);

    /*
    |--------------------------------------------------------------------------
    | Facebook Status
    |--------------------------------------------------------------------------
    */
    function fbStatus($facebook) {
        $facebook.getLoginStatus().then(
            function(response) {
                if (response.status === 'connected') {
                    postFbLoginSuccessful(response);
                } else if (response.status === 'not_authorized') {
                    console.log("nao autorizada a app");
                    fbLogin($facebook);
                } else {
                    fbLogin($facebook);
                }
            },
            function(response) {
                console.log('segundo '  + response);
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Facebook Login
    |--------------------------------------------------------------------------
    */
    function fbLogin($facebook) {
        $facebook.login(function(response) {
            if (response.authResponse) {
                postFbLoginSuccessful(response);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_events'});
    }

    function postFbLoginSuccessful(response) {
        var accessToken = response.authResponse.accessToken;
        logged = true;
        console.log(response);
    }
})();