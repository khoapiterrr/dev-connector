import axios from 'axios';
import { isAuthenticated } from './permissionCheker';
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  function (config) {
    if (isAuthenticated()) {
      config.headers.Authorization = isAuthenticated();
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default api;
