angular.module('chicks', ['ngFacebook'])
    .config(function ($facebookProvider) {
        $facebookProvider.setAppId('1465096787107378');
        $facebookProvider.setPermissions("user_events");
        $facebookProvider.setCustomInit({
            xfbml: true,
            version: 'v2.0'
        });
    })
    .run(['$facebook', function ($facebook) {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        fbStatus($facebook);
    }]);


/*
 |--------------------------------------------------------------------------
 | Facebook Status
 |--------------------------------------------------------------------------
 */
function fbStatus($facebook) {
    $facebook.getLoginStatus().then(
        function (response) {
            if (response.status === 'connected') {
                postFbLoginSuccessful(response);
            } else if (response.status === 'not_authorized') {
                console.log("nao autorizada a app");
                fbLogin($facebook);
            } else {
                fbLogin($facebook);
            }
        },
        function (response) {
            console.log('segundo ' + response);
        }
    );
}

/*
 |--------------------------------------------------------------------------
 | Facebook Login
 |--------------------------------------------------------------------------
 */
function fbLogin($facebook) {
    $facebook.login().then(function (response) {
        console.log(response);
    }, function (response) {
        console.log(response);
    })
}

function postFbLoginSuccessful(response) {
    var accessToken = response.authResponse.accessToken;
    console.log(response);
}