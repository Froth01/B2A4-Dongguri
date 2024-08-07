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
  return axiosInstance.post('/storybooks/transform', formData)
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
  return axiosInstance.get('/avatars/representative')
  .then(response => response.data)
  .catch(error => { throw error })
}


// 내 카드리스트 조회
export const fetchCardList = (getCardForm) => {
  if (getCardForm.type === 'mine') {
  return axiosInstance.get(`/storybooks/users/${getCardForm.userId}`)
    .then(response => response.data)
    .catch(error => { throw error; })
  } else if (getCardForm.type === 'keyword') {
    return axiosInstance.get(`/storybooks/users/`)
    .then(response => response.data)
    .catch(error => { throw error; })
  }
}

// 동화 등록
export const fetchStoryBooks = (data) => {
  return axiosInstance.post('/storybooks', data)
  .then(response => response.data )
  .catch(error => { throw error })
}

// 오디오 등록
export const fetchAudioUrl = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData)
  return axiosInstance.post('/file/audio',formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(response => response.data )
  .catch(error => { throw error })
}

