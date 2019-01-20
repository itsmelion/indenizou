import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Facebook from './Facebook';
import Google from './Google';

import app from '../../../defaults.json';
import './SocialLogin.scss';

const handleSocialLoginFailure = err => new Error(err);

const SocialLogin = memo(({ contactbyHandler, contactby, handleSocialLogin }) => (
  <div id="SocialLogin" row="">
    <Facebook
      provider="facebook"
      appId={app.facebookApp}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    />

    <Google
      provider="google"
      appId={app.googleAppId}
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    />

    <label htmlFor="contactby" className={`button inline whatsapp check ${ contactby }`}>
      <input
        checked={contactby}
        type="checkbox"
        name="CONTACTBY"
        id="contactby"
        onChange={contactbyHandler}
      />
      <FontAwesomeIcon icon={faWhatsapp} />
      Atendimento via WhatsApp
    </label>
  </div>
));

export default SocialLogin;
