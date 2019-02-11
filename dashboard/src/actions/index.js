import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

const API = process.env.REACT_APP_API_URL;

export const signUp = (formProps, callback) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API}/signup`, formProps);

    localStorage.setItem('token', data.token);
    dispatch({ type: AUTH_USER, payload: data.token });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signIn = (formProps, callback) => dispatch => axios
  .post(`${API}/signin`, formProps)
  .then(({ data }) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: AUTH_USER, payload: data.token });
  })
  .then(() => callback())
  .catch(() => dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' }));


export const signOut = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};
