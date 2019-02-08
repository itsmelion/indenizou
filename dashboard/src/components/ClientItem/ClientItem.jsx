import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './ClientItem.module.scss';

const ClientItem = React.memo(({ client }) => (
  <li>
    <Link className={style.card} to={`/cliente/${client.id}`}>
      <div row="" align="between start">
        <b>{client.name}</b>

        <legend className={style.tag}>{client.assunto}</legend>
      </div>

      <h6>{client.email}</h6>

      <p>
        <FontAwesomeIcon icon={faWhatsapp} />
        {client.phone}
      </p>

      <p className={style.contactby}>
        Preferencia de contato: &nbsp;
        <b>via {client.contactby}</b>
      </p>
    </Link>
  </li>
));

export default ClientItem;
