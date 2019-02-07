import React, { PureComponent } from 'react';
import axios from 'axios';
import { getCustomer, saveCustomer } from 'api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import style from './EditCustomer.module.scss';

class EditCustomer extends PureComponent {
  state = { customer: null };

  signal = axios.CancelToken.source();

  componentDidMount() {
    const { match } = this.props;
    const options = { cancelToken: this.signal.token };

    return getCustomer(match.params.id, options)
      .then(customer => this.setState(({ customer })));
  }

  componentWillUnmount() { this.signal.cancel(); }

  contactByHandler = e => this.changeState('contactby', e.target.value);

  changeState(key, value) {
    const { customer } = this.state;
    this.setState(({ customer: { ...customer, [key]: value } }));
  }

  save() {
    const { match } = this.props;
    const { customer } = this.state;
    const options = { cancelToken: this.signal.token };

    return saveCustomer(match.params.id, customer, options)
      .then(r => this.setState(({ customer: r })));
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
              {customer.phone}
            </div>

            <div className="mv1">
              <h6>Prefere contato via:</h6>
              <fieldset className="radio-group">
                <label
                  htmlFor="whatsapp"
                  className={(customer.contactby === 'whatsapp').toString()}
                >
                  <span>Whatsapp</span>
                  <input
                    type="radio"
                    name="whatsapp"
                    id="whatsapp"
                    value="whatsapp"
                    checked={customer.contactby === 'whatsapp'}
                    onChange={this.contactByHandler}
                  />
                </label>
              </fieldset>

              <fieldset className="radio-group">
                <label
                  htmlFor="email"
                  className={(customer.contactby === 'email').toString()}
                >
                  <span>Email</span>
                  <input
                    type="radio"
                    name="email"
                    id="email"
                    value="email"
                    checked={customer.contactby === 'email'}
                    onChange={this.contactByHandler}
                  />
                </label>
              </fieldset>
            </div>

            <Link className="button" to={`/clientes/${customer.id}/edit`}>
              <FontAwesomeIcon fixedWidth icon={faSave} /> Salvar
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
