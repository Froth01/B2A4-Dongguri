// /src/api/api.js
import axiosInstance from './AxiosIstance';

// 로그인
export const fetchLogin = (code, oauthServerType) => {
  return axiosInstance.post(`/oauth/login/${oauthServerType}`, { code })
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 회원가입
export const fetchSignup = (name, email, nickName, profileImageUrl, oauthServerType) => {
  return axiosInstance.post('/users/signup', { name, email, nickName, profileImageUrl, oauthServerType })
    .then(response => response.data)
    .catch(error => { throw error; });
};
