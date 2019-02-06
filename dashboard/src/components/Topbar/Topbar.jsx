import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './logo.svg';
import './Topbar.scss';

const Topbar = ({ authenticated }) => (
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
        {authenticated && (
          <>
            <NavLink to="/clientes">
              <FontAwesomeIcon icon={faUsers} /> Clientes
            </NavLink>

            <NavLink to="/signout">
              <FontAwesomeIcon icon={faPowerOff} /> Sair
            </NavLink>
          </>
        )}
      </ul>
    </div>
  </nav>
);

function mapStateToProps({ auth: { authenticated } }) {
  return { authenticated };
}

export default connect(mapStateToProps)(Topbar);
