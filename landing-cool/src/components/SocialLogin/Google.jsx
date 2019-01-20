import React from 'react';
import SocialLogin from 'react-social-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Button = ({ children, triggerLogin, ...props }) => (
  <button type="button" onClick={triggerLogin} className="button google" {...props}>
    <FontAwesomeIcon icon={faGoogle} />
    Google
  </button>
);

export default SocialLogin(Button);
