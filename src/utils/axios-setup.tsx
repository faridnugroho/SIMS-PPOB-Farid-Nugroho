import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const token = Cookies.get('accessToken');

const axiosInstance = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    toast.error('Session expired. Please log in again.');
    Cookies.remove('accessToken');
    Router.push('/auth/login');
  }
  return Promise.reject(error);
});

export default axiosInstance;