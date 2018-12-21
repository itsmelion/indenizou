import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './SocialLogin.scss';

const SocialLogin = React.memo(() => (
  <div id="SocialLogin" row="nowrap">
    <button type="button" className="button facebook">
      <FontAwesomeIcon icon={faFacebook} />
      Facebook
    </button>

    <button type="button" className="button google">
      <FontAwesomeIcon icon={faGoogle} />
      Google
    </button>
  </div>
));

export default SocialLogin;
