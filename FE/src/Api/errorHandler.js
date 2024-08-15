import { ErrorCode } from './errorCodes'; // 서버에서 정의된 에러 코드를 가져옵니다.

export const handleError = (error, navigate) => {
  console.log('에러췍췍:', error.response); 

  const status = error.response?.status;
  const errorCode = error.response?.data.reason;

  console.log('에러 status',status)
  console.log('에러 errorCode',errorCode)

  if (status === 401 || status === 403) {
    alert('인증이 필요합니다. 로그인 페이지로 이동합니다.');
    navigate('/login'); // 401이나 403 상태일 때 로그인 페이지로 리다이렉트
    return;
  }
  

  if (status && errorCode) {
    const errorMessage = errorCode || '알 수 없는 오류가 발생했습니다.';
    // const errorMessage = ErrorCode[errorCode]?.reason || '알 수 없는 오류가 발생했습니다.';
    alert(errorMessage); // 사용자에게 에러 메시지를 알림
  } else {
    alert('서버와의 통신에 문제가 발생했습니다.');
  }
};
