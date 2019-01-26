import React, { Suspense, lazy, memo } from 'react';

const Tabs = lazy(() => import('components/Tabs'));
const ClientList = lazy(() => import('components/Clientes'));

const Clients = memo(() => (
  <main contain="">
    <h1>Lista de Clientes</h1>

    <Suspense fallback={<div>Loading...</div>}>
      <Tabs />
      <ClientList />
    </Suspense>
  </main>
));

export default Clients;
