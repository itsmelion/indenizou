import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './ClientItem.module.scss';

const ClientItem = React.memo(({ client }) => (
  <li>
    <Link className={style.card} to={`/cliente/${client.id}`}>
      <div row="" align="between start">
        <b>{client.name || 'Sem nome'}</b>

        <legend className={style.tag}>{client.assunto}</legend>
      </div>

      <h6><a href={`mailto:${client.email}`}>{client.email}</a></h6>

      <a href={`tel:${client.phone}`}>
        <FontAwesomeIcon icon={faWhatsapp} />
        {client.phone}
      </a>

      <p className={style.contactby}>
        Preferencia de contato: &nbsp;
        <b>via {client.contactby}</b>
      </p>
    </Link>
  </li>
));

export default ClientItem;
