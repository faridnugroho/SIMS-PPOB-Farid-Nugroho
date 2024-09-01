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

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      toast.error(error.response.message);

      Router.push('/auth/login');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;