import React, { PureComponent } from 'react';
import axios from 'axios';
import ClientItem from 'components/ClientItem/ClientItem';
import style from './Pipeline.module.scss';

const API = process.env.REACT_APP_API_URL;

class Pipeline extends PureComponent {
  signal = axios.CancelToken.source();

  state = { clients: null, pipeline: [] };

  componentDidMount() {
    const options = { cancelToken: this.signal.token };

    return axios.get(`${API}/pipelines`, options)
      .then(({ data: pipeline }) => axios.get(`${API}/clients`, options)
        .then(({ data }) => this.setState(({ clients: data, pipeline }))))
      .catch(e => new Error(e));
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  render() {
    const { clients, pipeline } = this.state;

    if (!pipeline && !clients) return null;

    return (
      <main row="nowrap" className={style.container}>
        {pipeline.map(step => (
          <section flex="auto" key={step}>
            <h4 className="mb1" style={{ textTransform: 'capitalize' }}>{step}</h4>

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
