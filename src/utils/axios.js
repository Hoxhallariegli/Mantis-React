import axios from 'axios';
// import store from '../store';

const axiosClient = axios.create({
  baseURL: 'http://10.10.12.13:8000', // Laravel backend
  withCredentials: true, // Send cookies

});

export default axiosClient;