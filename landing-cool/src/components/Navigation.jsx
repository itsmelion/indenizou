import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Navigation = ({ siteTitle }) => (
  <nav style={{ background: 'rebeccapurple' }}>
    <h4>
      <Link to="/">{siteTitle}</Link>
    </h4>
  </nav>
);

Navigation.propTypes = {
  siteTitle: PropTypes.string,
};

Navigation.defaultProps = {
  siteTitle: 'Alia',
};

export default Navigation;
