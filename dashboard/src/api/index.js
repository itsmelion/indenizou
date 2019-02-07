import Axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL,
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
};

export const axios = Axios.create(defaultOptions);

const error = (msg, err, cb) => {
  Error(msg);
  console.error(err); // eslint-disable-line no-console
  return cb && cb();
};

export const getCustomer = (id, opt) => axios.get(`/customer/${id}`, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro em solicitar os dados do cliente.', e));

export const saveCustomer = (id, body, opt) => axios.put(`/customer/${id}`, body, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro ao salvar os dados do cliente.', e));
