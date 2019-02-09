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

export const getCustomer = (id, opt) => axios
  .get(`/customer/${id}`, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro em solicitar os dados do cliente.', e));

export const saveCustomer = (id, body, opt) => axios
  .put(`/customer/${id}`, body, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro ao salvar os dados do cliente.', e));

export const deleteCustomer = (id, opt) => axios
  .delete(`/customer/${id}`, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro ao deletar cliente.', e));

export const getPipelines = opt => axios
  .get('/pipelines', opt)
  .then(({ data }) => data)
  .catch(e => error('Erro ao buscar as Etapas na API.', e));

export const getCustomers = opt => axios
  .get('/clients', opt)
  .then(({ data }) => data)
  .catch(e => error('Erro em solicitar lista de clientes.', e));

export const uploadFiles = (id, fileList = [], opt) => {
  const files = new FormData();
  files.append('files', fileList[0]);

  return axios
    .post(`/customer/${id}/files`, files, opt)
    .then(({ data }) => data)
    .catch(e => error('Erro no upload dos arquivos.', e));
}

export const deleteFile = (id, file, opt) => axios
  .delete(`/customer/${id}/files/${file}`, opt)
  .then(({ data }) => data)
  .catch(e => error('Erro ao tentar deletar} o arquivo.', e));
