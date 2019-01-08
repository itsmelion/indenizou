import React, { PureComponent } from 'react';

const app = require('../../../../defaults.json');

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback (response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log '
        + 'into this app.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState () {
  FB.getLoginStatus(response => {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function fbAsyncInit () {
  FB.init({
    appId: app.facebookApp,
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8', // use graph api version 2.8
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(response => {
    statusChangeCallback(response);
  });
};

function loadFacebookSDK (d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  const js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  js.async = true;
  js.defer = true;
  fjs.parentNode.insertBefore(js, fjs);
}

function testAPI () {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', response => {
    console.log(`Successful login for: ${ response.name }`);
    document.getElementById('status').innerHTML = `Thanks for logging in, ${ response.name }!`;
  });
}

class Facebook extends PureComponent {
  constructor (props) {
    super(props);
    console.log(app.facebookApp);
  }

  componentWillMount () {
    loadFacebookSDK(document, 'script', 'facebook-jssdk');
  }

  render () {
    return (
      <>
        <login-button scope="public_profile,email" onlogin="checkLoginState();" />
        <div id="status" />
      </>
    );
  }
}

export default Facebook;
