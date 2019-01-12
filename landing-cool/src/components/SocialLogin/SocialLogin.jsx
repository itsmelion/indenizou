import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Facebook from './Facebook/Facebook';
import Google from './Google/Google';

import app from '../../../defaults.json';
import './SocialLogin.scss';

const handleSocialLogin = user => console.log(user);
const handleSocialLoginFailure = err => console.error(err);

const SocialLogin = (
  <div id="SocialLogin" row="nowrap">
    <Facebook
      provider="facebook"
      appId={app.facebookApp}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </Facebook>

    <Google
      provider="google"
      appId={app.googleAppId}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </Google>
  </div>
);

export default SocialLogin;
