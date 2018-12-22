import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'gatsby';
import logo from './logo.svg';
import './Topbar.scss';

class Topbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  closeMenu = () => this.setState({ collapsed: false });

  toggle = () => this.setState(({ collapsed }) => ({
    collapsed: !collapsed,
  }));

  render () {
    // eslint-disable-next-line react/destructuring-assignment
    const collapse = this.state.collapsed ? 'opened' : 'closed';

    return (
      <nav hide-print="" id="topbar" className={collapse}>
        <div className="contain row nowrap" align="between center">
          <Link
            flex="none"
            id="nav-logo"
            onClick={this.closeMenu}
            className="row nowrap above-left"
            align="start end"
            to="/"
          >
            <img src={logo} alt="logo Indenizou" />
          </Link>

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

          <ul flex="" align="end" className={`tabs ${ collapse }`}>
            <Link to="/" onClick={this.closeMenu}>
              menu Item
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Topbar;
