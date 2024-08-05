// /src/api/api.js
import axiosInstance from './AxiosIstance';


// 로그인
export const fetchLogin = (oauthServerType, code) => {
  return axiosInstance.get(`/oauth/login/${oauthServerType}?code=${code}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 회원가입
export const fetchSignup = (name, email, nickname, profileImageUrl, oauthServerType) => {
  return axiosInstance.post('/users/signup', { name, email, nickname, profileImageUrl, oauthServerType })
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 이미지 Url 변환
export const fetchImgUrl = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData)
  return axiosInstance.post('/file/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => response.data)
    .catch(error => { throw error; });
}

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

//팔로잉,팔로워 목록 조회
export const fetchGetUserList = (userId,type) => {
  console.log(userId, type)
  return axiosInstance.get(`/users/${userId}/${type}`)
    .then(response => response.data)
    .catch(error => { throw error; });
}

//아바타 목록 조회
export const fetchGetAvatarList = () => {
  return axiosInstance.get
}

// 대표동그리 조회
export const fetchRepresentative = () => {
  console.log()
  return axiosInstance.get('/avatars/representative')
  .then(response => response.data)
  .catch(error => { throw error })
}

//아바타 목록 조회
export const fetchGetAvatarList = () => {
  return axiosInstance.get
}