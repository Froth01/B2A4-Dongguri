import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://i11b309.p.ssafy.io/api/', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;


