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

// 내 카드리스트 조회
export const fetchCardList = (getCardForm) => {
  if (getCardForm.type === 'mine') {
    return axiosInstance.get(`/storybooks/users/${getCardForm.userId}`)
      .then(response => response.data)
      .catch(error => { throw error; });
  } else if (getCardForm.type === 'keyword') {
    const url = getCardForm.keyword ? `/storybooks?keyword=${getCardForm.keyword}` : '/storybooks';
    return axiosInstance.get(url)
      .then(response => response.data)
      .catch(error => { throw error; });
  }
}

// 공감하기
export const likeStorybook = (storybookId) => {
  return axiosInstance.post('/reactions', { storybookId })
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 공감 삭제
export const unlikeStorybook = (reactionId) => {
  return axiosInstance.delete(`/reactions/${reactionId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 공감 보기
export const getStorybookReactions = (storybookId) => {
  return axiosInstance.get(`/reactions/${storybookId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 댓글 관련 API
// 댓글 달기
export const postComment = (storybookId, content) => {
  return axiosInstance.post('/comments', { storybookId, content })
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 댓글 수정
export const patchComment = (commentId, content) => {
  return axiosInstance.patch(`/comments/${commentId}`, { content })
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 댓글 삭제
export const deleteComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 댓글 리스트 조회
export const fetchComments = (storybookId) => {
  return axiosInstance.get(`/comments/${storybookId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 동화 삭제
export const deleteStorybook = (storybookId) => {
  return axiosInstance.delete(`/storybooks/${storybookId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 동화 조회
export const getStorybook = (storybookId) => {
  return axiosInstance.get(`/storybooks/${storybookId}`)
    .then(response => response.data)
    .catch(error => { throw error; });
};