import axios from 'axios';
import { handleError } from './errorHandler'; 

const axiosInstance = axios.create({
  baseURL: 'https://i11b309.p.ssafy.io/api/', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    handleError(error); // 모든 에러는 공통 핸들러로 처리합니다.
    return Promise.reject(error);
  }
);

export default axiosInstance;


