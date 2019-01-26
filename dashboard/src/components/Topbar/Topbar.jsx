import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from './logo.svg';
import './Topbar.scss';

class Topbar extends Component {
  state = {
    collapsed: false,
  };

  closeMenu = () => this.setState({ collapsed: false });

  toggle = () => this.setState(({ collapsed }) => ({
    collapsed: !collapsed,
  }));

  render() {
    const collapse = this.state.collapsed ? 'opened' : 'closed';

    return (
      <nav hide-print="" id="topbar" className={collapse}>
        <div className="contain row nowrap" align="between center">
          <NavLink
            flex="none"
            id="nav-logo"
            onClick={this.closeMenu}
            className="row nowrap above-left"
            align="start end"
            to="/"
          >
            <Logo />
          </NavLink>

          <button
            type="button"
            onClick={this.toggle}
            className="show-mobile above-right"
            id="nav-toggle"
            flex="none"
          >
            <FontAwesomeIcon className="icon-closed" icon={faTimes} />
            <FontAwesomeIcon className="icon-menu" icon={faBars} />
          </button>

          <ul flex="" align="end" className={`tabs ${collapse}`}>
            <NavLink to="/clientes" onClick={this.closeMenu}>
              Clientes
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Topbar;
