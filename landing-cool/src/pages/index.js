import React from 'react';
import axiosRetry from 'axios-retry';
import axios from 'axios';
import Layout from 'components/Layout';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HowItWorks from 'components/HowItWorks/HowItWorks';
import Pipeline from 'components/Pipeline/Pipeline';
import Cases from 'components/Cases/Cases';
import 'main.scss';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const IndexPage = React.memo(() => (
  <Layout>
    {Header}
    {HowItWorks}
    {Pipeline}
    {Cases}
    {Footer}
  </Layout>
));

export default IndexPage;
