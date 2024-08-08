// /src/api/api.js
import axiosInstance from './AxiosIstance';


// 로그인
export const fetchLogin = (oauthServerType, code) => {
  return axiosInstance.get(`/oauth/login/${oauthServerType}?code=${code}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 회원가입
export const fetchSignup = (signupForm) => {
  return axiosInstance.post('/users/signup', signupForm)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 로그아웃
export const fetchLogout = () => {
  return axiosInstance.get('/users/logout')
  .then(response => response.data)
  .catch(error => { throw error; })
}

// 유저정보 가져오기
export const fetchUser = (userId) => {
  return axiosInstance.get(`/users/${userId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 유저정보 수정하기
export const fetchUserUpdate = (updateForm) => {
  return axiosInstance.patch(`/users`, updateForm)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 이미지 Url 변환
export const fetchImgUrl = (file) => {
  const formData = new FormData();
  formData.append('file', file);
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
export const fetchCardListByUserId = (userId) => {
  return axiosInstance.get(`/storybooks/users/${userId}`)
    .then(response => response.data)
    .catch(error => { throw error; })
}


//   } else if (getCardForm.type === 'keyword') {
//     return axiosInstance.get(`/storybooks/users/`)
//     .then(response => response.data)
//     .catch(error => { throw error; })
//   }
// }

// 내 월드 조회
export const fetchWorld = (userId) => {
  return axiosInstance.get(`/storyworlds/${userId}`)
  .then(response => response.data)
  .catch(error => { throw error; })
}

// 월드 수정 적용하기
export const fetchWorldUpdate = (patchInfo) => {
  console.log('들어온 patchInfo :', patchInfo)
  return axiosInstance.patch(`/storyworlds/${patchInfo.storyWorldId}`, patchInfo.patchForm)
    .then(response => response.data)
    .catch(error => { throw error; })
}

// 동화 등록
export const fetchStoryBooks = (formData) => {
  return axiosInstance.post('/storybooks', formData)
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

// 키워드 동화 목록 조회
export const fetchSearchResults = (keyword) => {
  return axiosInstance.get('/storybooks', {
    params: { keyword }
  })
  .then(response => response.data)
  .catch(error => { throw error });
};

// 유저 검색
export const fetchUserResults = (userId) => {
  return axiosInstance.get(`users/${userId}`,{
    params: {userId}
  })
  .then(response => response.data)
  .catch(error => { throw error })
}
