import React from 'react';
import logo from 'images/gatsby-icon.png';
import PoweredBy from './PoweredBy';
import './Footer.scss';

const Footer = (
  <footer id="Footer" hide-print="">
    <div className="contain column footer" align="between start">
      <img width="28" src={logo} alt="Logo Indenizou" />

      <p>indenizou</p>

      <a className="link" href="//instagram.com/indenizou">
        @indenizou
      </a>
    </div>

    {PoweredBy}
  </footer>
);

export default Footer;
