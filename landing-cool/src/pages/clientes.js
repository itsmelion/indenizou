import React, { Suspense, lazy, memo } from 'react';
import Layout from 'components/Layout';

const Tabs = lazy(() => import('components/BackOffice/Tabs'));
const ClientList = lazy(() => import('components/BackOffice/Clientes'));

const Clients = memo(() => (
  <Layout>
    <main contain="">
      <h1>Lista de Clientes</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Tabs />
        <ClientList />
      </Suspense>
    </main>
  </Layout>
));

export default Clients;
