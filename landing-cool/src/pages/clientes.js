import React from 'react';
import Tabs from 'components/BackOffice/Tabs';
import Layout from 'components/Layout';
import ClientList from 'components/BackOffice/Clientes';
import styles from 'components/BackOffice/Clientes.module.scss';

const Clients = React.memo(() => (
  <Layout>
    <main contain="">
      <h1>Lista de Clientes</h1>

      <Tabs />

      <ol className={styles.list}>
        <ClientList />
      </ol>
    </main>
  </Layout>
));

export default Clients;
