import React from 'react';
import logo from 'images/logo-color.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import PoweredBy from './PoweredBy';
import './Footer.scss';

const Footer = (
  <footer id="Footer" hide-print="">
    <div className="contain row footer" align="between start" mobile-align="center center">
      <a row="nowrap" align="center center" className="link mb05" href="//indenizou.com/sobre">
        <img className="mr05" width="24" src={logo} alt="Logo Indenizou" />
        <p>indenizou</p>
      </a>

      <div className="column mobile-row mb1" align="start end" mobile-align="start start">
        <a className="link p05" href="//instagram.com/indenizou">
          @indenizou
          <FontAwesomeIcon className="ml05" icon={faInstagram} />
        </a>

        <a className="link p05" href="//instagram.com/indenizou">
          Facebook
          <FontAwesomeIcon className="ml05" icon={faFacebookSquare} />
        </a>
      </div>

      <div className="column mobile-row" align="start end" mobile-align="start start">
        <a className="link p05" href="//indenizou.com/sobre">
        Sobre a Indenizou
        </a>

        <a className="link p05" href="//indenizou.com/sobre">
        Casos de sucesso
        </a>

        <a className="link p05" href="//indenizou.com">
        Item 1
        </a>

        <a className="link p05" href="//indenizou.com">
        item 2
        </a>
      </div>
    </div>

    {PoweredBy}
  </footer>
);

export default Footer;
