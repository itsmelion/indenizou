import React from 'react';
import logo from 'images/logo-color.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import PoweredBy from './PoweredBy';
import './Footer.scss';

const Footer = (
  <footer id="Footer" hide-print="">
    <div className="contain mobile-column row footer" align="between start" mobile-align="center center">
      <a row="nowrap" align="center center" className="link mb1" href="//indenizou.com/">
        <img className="mr05" width="24" src={logo} alt="Logo Indenizou" />
        <p>Indenizou</p>
      </a>

      <div className="column mobile-row mb1 mobile-wrap" align="start end" mobile-align="start start">
        <a className="link p05" href="//instagram.com/indenizou">
          @indenizou
          <FontAwesomeIcon className="ml05" icon={faInstagram} />
        </a>

        <a className="link p05" href="//facebook.com/indenizou">
          Facebook
          <FontAwesomeIcon className="ml05" icon={faFacebookSquare} />
        </a>
      </div>

      <div column="" align="start end" mobile-align="start center">
        <a className="link p05" href="//indenizou.com/quem-somos">
        Sobre a Indenizou
        </a>

        <a className="link p05" href="//indenizou.com/direitos">
        Quais são os meus direitos?
        </a>

        <a className="link p05" href="//indenizou.com/noticias">
        Notícias
        </a>

        <a className="link p05" href="//indenizou.com/contato">
        Contato
        </a>
      </div>
    </div>

    {PoweredBy}
  </footer>
);

export default Footer;
