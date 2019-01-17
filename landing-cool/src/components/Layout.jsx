/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { StaticQuery, graphql } from 'gatsby';
import 'main.scss';
// import Topbar from 'components/Topbar/Topbar';
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title={data.site.siteMetadata.title} />
        {/* <Topbar /> */}
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
