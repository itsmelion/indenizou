import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './SocialLogin.scss';
import Facebook from './Facebook/Facebook'

const SocialLogin = (
  <div id="SocialLogin" row="nowrap">
    <button type="button" className="button facebook">
      <FontAwesomeIcon icon={faFacebook} />
      Facebook
    </button>

    <Facebook />

    <button type="button" className="button google">
      <FontAwesomeIcon icon={faGoogle} />
      Google
    </button>
  </div>
);

export default SocialLogin;
