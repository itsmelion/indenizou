import React from 'react';
import SignUp from 'components/SignUp/SignUp';
import './Header.scss';
import leavesLeft from './leaves-left.svg';
import leavesRight from './leaves-right.svg';
import plane from './plane.svg';
import suitcase from './case.svg';

const Header = (
  <header id="header" row="">
    <div row="nowrap" mobile-column="" className="contain" align="around center">
      <div mobile-flex="100" className="p1 hero">
        <div className="ph2">
          <h4>Deu ruim?</h4>
          <h1><b>Aqui sua indenização chega voando!</b></h1>
          <h2>A ajuda <b>é grátis</b>, então peça agora a sua!</h2>
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
