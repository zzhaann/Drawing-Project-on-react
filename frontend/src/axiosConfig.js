import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Базовый URL вашего Django API
});

export default axiosInstance;
