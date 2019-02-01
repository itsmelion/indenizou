import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './logo.svg';
import './Topbar.scss';

const Topbar = () => (
  <nav hide-print="" id="topbar">
    <div className="contain row nowrap" align="between center">
      <NavLink
        flex="none"
        id="nav-logo"
        className="row nowrap above-left"
        align="start end"
        to="/"
      >
        <Logo />
      </NavLink>

      <ul flex="" align="end" mobile-align="between" className="tabs">
        <NavLink to="/clientes">
          <FontAwesomeIcon icon={faUsers} /> Clientes
        </NavLink>
      </ul>
    </div>
  </nav>
);

export default Topbar;
