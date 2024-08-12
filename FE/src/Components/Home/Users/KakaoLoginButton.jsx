
import { useEffect } from 'react';

const KakaoLoginButton = () => {
  useEffect(() => {
    const loadKakaoSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
      script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        if (window.Kakao) {
          window.Kakao.init('72f3a79dc0f4715f7c74c8706bc085f5'); 
        }
      };
      document.body.appendChild(script);
    };

    loadKakaoSDK();
  }, []);

  const loginWithKakao = () => {
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/kakao-callback`,  // 리디렉션 URI 설정
      });
    }
  };

  return (
    <div>
      <button id="kakao-login-btn" onClick={loginWithKakao}>
        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222" alt="카카오 로그인 버튼" />
      </button>
    </div>
  );
};

export default KakaoLoginButton;
