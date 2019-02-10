import React, { PureComponent } from 'react';
import axios from 'axios';
import { getPipelines, getCustomers } from 'api';
import ClientItem from 'components/ClientItem/ClientItem';
import style from './Pipeline.module.scss';

class Pipeline extends PureComponent {
  signal = axios.CancelToken.source();

  state = { clients: null, pipeline: [] };

  componentDidMount() {
    const options = { cancelToken: this.signal.token };

    return getPipelines(options)
      .then(pipeline => getCustomers(options)
        .then(clients => this.setState(({ clients })))
        .then(() => this.setState(({ pipeline }))));
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  render() {
    const { clients, pipeline } = this.state;
    console.log('---');
    console.log('rule', (!pipeline.length && !clients));
    console.log('pipeline', pipeline);
    console.log('clients', clients);
    if (!pipeline.length || !clients) return null;

    return (
      <main row="nowrap" className={style.container}>
        {pipeline.map(step => (
          <section flex="auto" key={step}>
            <h4 className="mb1 cap" style={{ textTransform: 'capitalize' }}>{step}</h4>

            <ol>
              {clients[step] && clients[step].map(
                client => <ClientItem client={client} key={client.id} />,
              )}
            </ol>
          </section>
        ))}
      </main>
    );
  }
}

export default Pipeline;
