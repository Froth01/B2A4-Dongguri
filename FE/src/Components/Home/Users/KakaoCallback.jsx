import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../../slices/authSlice';
import { setAuthObject } from '../../../slices/authSlice';

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      const handleKakaoLogin = async () => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
          try {
            const user = await dispatch(login({ oauthServerType: 'KAKAO', code })).unwrap();
            console.log(user.data.user)
            if (user.data.user === null) {
              navigate('/signup', { state: { user , code: code }});
            } else {
              dispatch(setAuthObject(user.data.user))
              navigate('/'); // 유저가 등록되어 있으면 홈페이지로 이동
            }
          } catch (error) {
            console.error('Login failed:', error);
            // 로그인 실패 시 처리 (예: 오류 메시지 표시)
          }
        }
    };

    handleKakaoLogin();
  }, [dispatch, navigate, location]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
