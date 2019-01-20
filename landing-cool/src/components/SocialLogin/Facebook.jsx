import React from 'react';
import SocialLogin from 'react-social-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Button = ({ children, triggerLogin, ...props }) => (
  <button type="button" onClick={triggerLogin} className="button facebook" {...props}>
    <FontAwesomeIcon icon={faFacebook} />
    Facebook
  </button>
);

export default SocialLogin(Button);
