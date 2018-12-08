/* eslint-disable import/no-unresolved */
import React from 'react';
import Layout from 'components/Layout';
import Footer from 'components/Footer/Footer';
import 'main.scss';

const teststyle = {
  height: '90vh',
  backgroundColor: process.env.REACT_APP_THEME,
  color: 'white',
};

const IndexPage = () => (
  <Layout>
    <header row="" align="center center" style={teststyle}>
      <h1>Hey, Welcome!</h1>
    </header>
    <Footer />
  </Layout>
);

export default IndexPage;
