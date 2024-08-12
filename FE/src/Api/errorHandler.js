import { ErrorCode } from './errorCodes'; // 서버에서 정의된 에러 코드를 가져옵니다.

export const handleError = (error) => {
  const status = error.response?.status;
  const errorCode = error.response?.data?.code;

  if (status && errorCode) {
    const errorMessage = ErrorCode[errorCode]?.reason || '알 수 없는 오류가 발생했습니다.';
    alert(errorMessage); // 사용자에게 에러 메시지를 알림
  } else {
    alert('서버와의 통신에 문제가 발생했습니다.');
  }
};
