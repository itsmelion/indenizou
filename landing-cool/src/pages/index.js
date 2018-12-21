/* eslint-disable import/no-unresolved */
import React from 'react';
import Layout from 'components/Layout';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HowItWorks from 'components/HowItWorks/HowItWorks';
import 'main.scss';

const IndexPage = React.memo(() => (
  <Layout>
    {Header}
    {HowItWorks}
    {/* <Cases /> */}
    {Footer}
  </Layout>
));

export default IndexPage;
