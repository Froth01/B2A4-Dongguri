// /src/api/api.js
import axiosInstance from './AxiosIstance';

// 로그인
export const fetchLogin = (oauthServerType, code) => {
  return axiosInstance.get(`/oauth/login/${oauthServerType}?code=${code}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 회원가입
export const fetchSignup = (name, email, nickName, profileImageUrl, oauthServerType) => {
  return axiosInstance.post('/users/signup', { name, email, nickName, profileImageUrl, oauthServerType })
    .then(response => response.data)
    .catch(error => { throw error; });
};


// 동화 그림, 스토리 생성
export const transformStorybook = (formData) => {
  return axiosInstance.post('/api/storybooks/transform', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => response.data)
    .catch(error => { throw error; });
};