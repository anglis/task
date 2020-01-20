import axios from 'axios';
import { pathEq } from 'ramda';
import { } from 'react-router';

const createResponseInterceptors = (dispatch) => ({
  success(response) {
    return response;
  },
  error(error) {
    if (pathEq(['response', 'status'], 401, error)) {
      window.location.replace('/auth/login');
      localStorage.removeItem('token');
    }


    return Promise.reject(error);
  }
})

export default function (dispatch) {
  const token = localStorage.getItem('token');
  const instance = axios.create({ baseURL: '/api' });
  const responseInterceptors = createResponseInterceptors(dispatch);

  instance.interceptors.response.use(responseInterceptors.success, responseInterceptors.error);

  if (token) {
    instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }

  return instance;
}