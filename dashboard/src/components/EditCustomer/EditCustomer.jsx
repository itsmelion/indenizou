import React, { PureComponent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import style from './EditCustomer.module.scss';

const API = process.env.REACT_APP_API_URL;

class EditCustomer extends PureComponent {
  state = { customer: null };

  signal = axios.CancelToken.source();

  headers = { Authorization: localStorage.getItem('token') };

  componentDidMount() {
    const { match } = this.props;
    const options = { cancelToken: this.signal.token, headers: this.headers };

    return axios.get(`${API}/customer/${match.params.id}`, options)
      .then(({ data }) => this.setState(({ customer: data })))
      .catch(e => new Error(e));
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  save(data) {
    const { match } = this.props;
    const options = { cancelToken: this.signal.token, headers: this.headers };

    return axios.put(`${API}/customer/${match.params.id}`, data, options)
      .then(({ data: customer }) => this.setState(({ customer })))
      .catch(e => new Error(e));
  }


  render() {
    const { customer } = this.state;
    if (!customer) return null;

    return (
      <main>
        <header row="" align="start end" className={style.header}>
          <div align="start center" contain="" className="row pv1">
            <h2 className={style.name}>{customer.name}</h2>
            <div className={style.status}>{customer.status}</div>
          </div>
        </header>

        <div row="" contain="" className={style.sections}>
          <section className={style.data} flex="auto">
            <div className="mv1">
              <h6>Email:</h6>
              <a className="link" href={`mailto:${customer.email}`}>
                {customer.email}
              </a>
            </div>

            <div className="mv1">
              <h6>Telefone:</h6>
              <a className="link" href={`tel:${customer.phone}`}>
                {customer.phone}
              </a>
            </div>

            <div className="mv1">
              <h6>Prefere contato via:</h6>
              {customer.contactby}
              {customer.contactby === 'whatsapp'
                && <FontAwesomeIcon fixedWidth icon={faWhatsapp} />}
            </div>

            <Link className="button" to={`/clientes/${customer.id}/edit`}>
              <FontAwesomeIcon icon={faEdit} /> Editar Dados
            </Link>
          </section>

          <section className={style.files} flex="auto">
            <h3>Documentos</h3>
            Files
          </section>
        </div>
      </main>
    );
  }
}

export default EditCustomer;
