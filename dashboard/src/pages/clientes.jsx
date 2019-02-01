import React, { Suspense, lazy } from 'react';

const Tabs = lazy(() => import('components/Tabs'));
const ClientList = lazy(() => import('components/Clientes'));

const Clients = () => (
  <main contain="">
    <h1>Lista de Clientes</h1>
    <section column="" align="start start">
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs />
        <ClientList />
      </Suspense>
    </section>
  </main>
);

export default Clients;
