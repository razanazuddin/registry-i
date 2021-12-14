const facebookAppId = process.env.FACEBOOK_APP_ID;

export function initFacebookSdk() {
  return new Promise(() => {
    // init
    window.fbAsyncInit = function () {
      FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });
    };

    // sdk
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
