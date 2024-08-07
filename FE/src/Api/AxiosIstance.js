import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://i11b309.p.ssafy.io/api/', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   console.log('token',token)
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });



export default axiosInstance;


