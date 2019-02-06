import React from 'react';
import style from './ShowCustomer.module.scss';

const ShowCustomer = ({ customer }) => (
  <main contain="">
    <h2 className={style.name}>{customer}</h2>
  </main>
);

export default ShowCustomer;
