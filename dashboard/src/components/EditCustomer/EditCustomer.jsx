/* eslint-disable lines-between-class-members */
import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  getCustomer, saveCustomer, getPipelines, deleteCustomer,
} from 'api';
import PhoneInput from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import FileUpload from 'components/FileUpload/FileUpload';
import style from './EditCustomer.module.scss';

const assuntos = [
  'cancelamento', 'atraso', 'overbooking', 'extravio de bagagem', 'outros',
];

class EditCustomer extends PureComponent {
  state = { customer: null, pipelines: [] };

  signal = axios.CancelToken.source();

  componentDidMount() {
    const { match } = this.props;
    const options = { cancelToken: this.signal.token };

    getPipelines(options).then(pipelines => this.setState(({ pipelines })));

    return getCustomer(match.params.id, options)
      .then(customer => this.setState(({ customer })));
  }

  componentWillUnmount() { this.signal.cancel(); }

  contactByHandler = e => this.changeState('contactby', e.target.value);
  outrosHandler = e => this.changeState('outros', e.target.value);
  emailHandler = e => this.changeState('email', e.target.value);
  assuntoHandler = e => this.changeState('assunto', e.target.value);
  pipelineHandler = e => this.changeState('status', e.target.value);
  nameHandler = e => this.changeState('name', e.target.value);
  phoneHandler = phone => this.changeState('phone', phone);

  deleteCustomer = () => {
    const { match, history: h } = this.props;
    const options = { cancelToken: this.signal.token };
    // eslint-disable-next-line no-alert
    const prompt = window.confirm('Deletar esse Cliente? essa ação é irreversível.');

    if (!prompt) return 0;

    return deleteCustomer(match.params.id, options)
      .then(() => h.push('/clients'));
  }

  save = () => {
    const { match, history: h } = this.props;
    const { customer } = this.state;
    const options = { cancelToken: this.signal.token };

    return saveCustomer(match.params.id, customer, options)
      .then(({ id }) => h.push(`/clients/${id}`));
  }

  changeState(key, value) {
    const { customer } = this.state;
    this.setState(({ customer: { ...customer, [key]: value } }));
  }

  render() {
    const { customer, pipelines } = this.state;
    if (!customer) return null;

    return (
      <main>
        <header row="" align="start end" className={style.header}>
          <div className="contain row nowrap mobile-wrap" align="start center">
            <div flex="auto" align="start center" className="row pv1">
              <h2 className={style.name}>{customer.name}</h2>
              <div className={style.status}>{customer.status}</div>
            </div>

            <span flex="" />

            <div flex="none">
              <button
                type="button"
                className="button danger m1"
                title="Deletar Cliente"
                onClick={this.deleteCustomer}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </header>

        <div row="" contain="" className={style.sections}>
          <section className={style.data} flex="auto">
            <div className="mb1">
              <h6 className="ml1">Etapa:</h6>

              <select flex="none" value={customer.status} onChange={this.pipelineHandler}>
                {pipelines.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div className="mv1">
              <div column="" align="start start" className={style.outro}>
                <h6>Assunto:</h6>

                <select flex="none" value={customer.assunto} onChange={this.assuntoHandler}>
                  {assuntos.map(assunto => (
                    <option key={assunto} value={assunto}>{assunto}</option>
                  ))}
                </select>

                {(customer.outros || customer.assunto === 'outros') && (
                  <textarea
                    flex=""
                    name="outros"
                    id="outros"
                    value={customer.outros}
                    onChange={this.outrosHandler} />
                )}
              </div>
            </div>

            <div className="mv1">
              <h6>Nome:</h6>
              <input
                id="name"
                type="text"
                name="name"
                value={customer.name}
                onChange={this.nameHandler}
                autoComplete="off" />
            </div>

            <div className="mv1">
              <h6>Email:</h6>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="off"
                value={customer.email}
                onChange={this.emailHandler} />
            </div>

            <div className="mv1">
              <h6>Telefone:</h6>
              <PhoneInput
                country="BR"
                displayInitialValueAsLocalNumber
                autoComplete="off"
                national="true"
                international={false}
                showCountrySelect={false}
                name="phone"
                placeholder="31 92222 2222"
                minLength="11"
                maxLength="15"
                id="phone"
                type="tel"
                value={customer.phone}
                onChange={this.phoneHandler} />
            </div>

            <div className="mv1">
              <h6>Prefere contato via:</h6>
              <fieldset className={style.radio}>
                <label
                  row=""
                  align="start center"
                  htmlFor="whatsapp"
                  className={(customer.contactby === 'whatsapp').toString()}>
                  <input
                    type="radio"
                    name="whatsapp"
                    id="whatsapp"
                    value="whatsapp"
                    checked={customer.contactby === 'whatsapp'}
                    onChange={this.contactByHandler} />
                  <span>Whatsapp</span>
                </label>
              </fieldset>

              <fieldset className={style.radio}>
                <label
                  row=""
                  align="start center"
                  htmlFor="email"
                  className={(customer.contactby === 'email').toString()}>
                  <input
                    type="radio"
                    name="email"
                    id="email"
                    value="email"
                    checked={customer.contactby === 'email'}
                    onChange={this.contactByHandler} />
                  <span>Email</span>
                </label>
              </fieldset>
            </div>

            <div row="nowrap" align="between" className="mt2">
              <button type="button" className="button" onClick={this.save}>
                <FontAwesomeIcon icon={faSave} />
                <span> Salvar</span>
              </button>

              <button
                type="button"
                className="button danger"
                title="Deletar Cliente"
                onClick={this.deleteCustomer}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </section>

          <section className={style.files} flex="auto">
            <h3>Documentos</h3>

            <FileUpload userID={customer.id} files={customer.files} />
          </section>
        </div>
      </main>
    );
  }
}

export default EditCustomer;
