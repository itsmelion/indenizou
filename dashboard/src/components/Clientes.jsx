import React, { Component } from 'react';
import axios from 'axios';
import styles from './Clientes.module.scss';

const Item = React.memo(({ client }) => (
  <li className="p05">{client.email}</li>
));

export default class ClientList extends Component {
  state = { data: [] };

  componentDidMount() {
    axios.get(`${process.env.API_URL}/subscribers`)
      .then(({ data }) => this.setState(({ data })));
  }

  render() {
    const { data } = this.state;
    if (!data) return null;

    return (
      <ol className={styles.list}>
        {data.map(client => <Item client={client} key={client._id} />)}
      </ol>
    );
  }
}
