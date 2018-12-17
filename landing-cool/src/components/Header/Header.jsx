import React from 'react';
import SignUp from 'components/SignUp/SignUp';
import styles from './Header.module.scss';

const Header = React.memo(() => (
  <header row="" className={styles.header}>
    <div flex="" contain="" row="" align="around center">
      <div className="hero">
        <h1>Deu ruim?</h1>
        <h2>Aqui sua indenização chega voando!</h2>
        <h3>A gente te ajuda, é grátis, entao peça agora a sua!</h3>
      </div>

      <SignUp />
    </div>
  </header>
));

export default Header;