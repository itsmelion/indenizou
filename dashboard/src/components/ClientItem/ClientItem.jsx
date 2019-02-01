import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './ClientItem.module.scss';

const ClientItem = React.memo(({ client }) => (
  <li className={style.card}>
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
  </li>
));

export default ClientItem;
