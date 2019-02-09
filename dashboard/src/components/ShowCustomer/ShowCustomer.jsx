import React, { PureComponent } from 'react';
import axios from 'axios';
import { getCustomer } from 'api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import style from './ShowCustomer.module.scss';

class ShowCustomer extends PureComponent {
  state = { customer: null };

  signal = axios.CancelToken.source();

  componentDidMount() {
    const { match } = this.props;
    const options = { cancelToken: this.signal.token };

    return getCustomer(match.params.id, options)
      .then(customer => this.setState(({ customer })));
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  render() {
    const { customer } = this.state;
    if (!customer) return null;

    return (
      <main>
        <header row="" align="start end" className={style.header}>
          {customer.profilePicture && (
            <img className={style.avatar} src={customer.profilePicture} alt="profile" />
          )}
          <div align="start center" contain="" className="row pv1">
            <h2 className={style.name}>{customer.name}</h2>
            <div className={`cap ${style.status}`}>{customer.status}</div>
          </div>
        </header>

        <div row="" contain="" className={style.sections}>
          <section column="" flex="auto">
            <section className={style.data}>
              <div className="mb1">
                <div className={style.outros}>
                  <h3>{customer.assunto}</h3>
                  {customer.outros && <p>{customer.outros}</p>}
                </div>
              </div>

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

              <Link className="button" to={`/cliente/${customer.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} /> Editar Dados
              </Link>
            </section>

            <article className={style.mailchimp}>
              <h4 className="mb2">
                Inscrição de email:
                <sub>&nbsp;(Mailchimp)</sub>
              </h4>

              {customer.mailchimp.abuse && (
                <p className="bold warn">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  &nbsp;Reportado como Abuso ou Spam
                </p>
              )}

              {customer.mailchimp.status && (
                <div className="mv1">
                  <h6>Status:</h6>
                  <p>{customer.mailchimp.status}</p>
                </div>
              )}

              {!!customer.mailchimp.tags.length && (
                <div className="mv1">
                  <h6>Tags:</h6>
                  <ul className={style.tags}>
                    {customer.mailchimp.tags.map(tag => <li key={tag}>{tag}, &nbsp;</li>)}
                  </ul>
                </div>
              )}
            </article>
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

export default ShowCustomer;
