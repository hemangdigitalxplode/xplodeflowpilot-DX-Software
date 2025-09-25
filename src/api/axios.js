// axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('authToken');

const axiosInstance = axios.create({
  baseURL: 'https://digitalxplode.in/admin/api',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});



export default axiosInstance;
