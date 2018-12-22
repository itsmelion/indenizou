import React from 'react';
import SignUp from 'components/SignUp/SignUp';
import styles from './Header.module.scss';

const Header = (
  <header row="" className={styles.header}>
    <div contain="" row="" align="around center">
      <div className="p1 hero">
        <h1>Deu ruim?</h1>
        <h2>Aqui sua indenização chega voando!</h2>
        <h3>A ajuda <b>é grátis</b>, entao peça agora a sua!</h3>
      </div>

      <SignUp />
    </div>
  </header>
);

export default Header;
