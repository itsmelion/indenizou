import React from 'react';
import style from './EditCustomer.module.scss';

const EditCustomer = ({ customer }) => (
  <main contain="">
    <h2 className={style.name}>{customer}</h2>
  </main>
);

export default EditCustomer;
