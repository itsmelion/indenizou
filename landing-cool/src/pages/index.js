import React from 'react';
import Layout from 'components/Layout';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HowItWorks from 'components/HowItWorks/HowItWorks';
import Pipeline from 'components/Pipeline/Pipeline';
import Cases from 'components/Cases/Cases';
import 'main.scss';

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
