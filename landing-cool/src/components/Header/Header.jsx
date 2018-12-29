import React from 'react';
import SignUp from 'components/SignUp/SignUp';
import './Header.scss';
import leavesLeft from './leaves-left.svg';
import leavesRight from './leaves-right.svg';
import plane from './plane.svg';
import suitcase from './case.svg';

const Header = (
  <header id="header" row="">
    <div className="contain row" align="around center">
      <div mobile-flex="100" className="p1 hero">
        <div className="ph2">
          <h1>Deu ruim?</h1>
          <h2>Aqui sua indenização chega voando!</h2>
          <h3>A ajuda <b>é grátis</b>, entao peça agora a sua!</h3>
        </div>

        <div className="artwork">
          <div className="suitcase">
            <img className="left" src={leavesLeft} alt="folhas esquerda" />
            <img className="right" src={leavesRight} alt="folhas direita" />
            <img className="case" src={suitcase} alt="mala" />
          </div>

          <div className="plane"><img src={plane} alt="avião" /></div>
        </div>
      </div>

      <SignUp />
    </div>
  </header>
);

export default Header;
