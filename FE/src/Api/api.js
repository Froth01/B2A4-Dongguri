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
  return axiosInstance.get('/avatars')
    .then(response => response.data)
    .catch(error => { throw error ; })
}

// 대표동그리 조회
export const fetchRepresentative = () => {
  return axiosInstance.get('/avatars/representative')
  .then(response => response.data)
  .catch(error => { throw error })
}

// 동그리 표기레벨 변경하기 -> 동시에 대표동그리로 설정함
export const fetchAvatarDisplayLevel = (avatarLevelForm) => {
  return axiosInstance.patch(`/avatars/display`, avatarLevelForm)
    .then(response => response.data)
    .catch(error => { throw error; });
};

export const fetchAvatarRepresentative = (avatarId) => {
  return axiosInstance.patch(`/avatars`, {avatarId: avatarId})
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 동그리 이름 변경하기
export const fetchAvatarName = (avatarNameForm) => {
  return axiosInstance.patch(`/avatars/${avatarNameForm.avatarId}`, avatarNameForm.patchForm)
    .then(response => response.data)
    .catch(error => { throw error; });
};

// 유저아이디 -  카드리스트 조회
export const fetchCardListByUserId = (cardListForm) => {
  console.log('보내는 카드리스트 정보 : ',cardListForm)
  return axiosInstance.get(`/storybooks/users/${cardListForm.userId}?page=${cardListForm.page}`, cardListForm)
    .then(response => response.data)
    .catch(error => { throw error; })
}
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


// 오늘의 키워드
export const getTodayKeyword= () => {
  return axiosInstance.get('today-keyword')
    .then(response => response.data)
    .catch(error => { throw error; });
}
