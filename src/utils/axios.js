import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://10.10.12.13:8000', // Laravel API
    withCredentials: true // për cookie
});

export default axiosClient;
