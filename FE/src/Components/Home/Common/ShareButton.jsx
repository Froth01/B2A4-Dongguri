import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Share from '/img/sns/Share.png'
import './css/ShareButton.css'
const KakaoShareButton = ({ card }) => {
  console.log('공유', card);

  useEffect(() => {
    const loadKakaoSDK = () => {
      return new Promise((resolve) => {
        if (window.Kakao) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
          script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
          script.crossOrigin = 'anonymous';
          script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
              // window.Kakao.init('65c79327b948613354ca939c2c67db0f'); // JavaScript 키
              window.Kakao.init('0536894c82d8dda2013ee7211364733a'); // (서버키)JavaScript 키
            }
            resolve();
          };
          document.body.appendChild(script);
        }
      });
    };

    loadKakaoSDK();
  }, []);

  const handleShareClick = () => {
    if (window.Kakao) {
      const title = Array.isArray(card.keywords) && card.keywords.length > 0 
        ? `#${card.keywords.join(' #')}`  // 각 키워드 앞에 #을 붙이고, 맨 앞에도 # 추가
        : '#기본제목';  // 기본값에도 # 추가

      const imageUrl = card.originalImageUrl || 'https://example.com/default-image.png';  // 기본 이미지 설정
      const shareUrl = `${window.location.origin}/sns/${card.storybookId}`
      // console.log('공유하기로 보낼 스토리북 ID',card.object.storybookId)
      // const shareUrl = `http://localhost:5173/sns/${card.storybookId}`
      console.log('공유 링크',shareUrl)

      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: title,
          description: '우리 아이가 만든 동화를 확인하세요!',
          imageUrl: imageUrl,
          link: {
            // webUrl: `https://i11b309.p.ssafy.io/sns/${card.storybookId}`,
            // webUrl: `https://localhost:5173/sns/${card.storybookId}`,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              // webUrl: `https://i11b309.p.ssafy.io/sns/${card.storybookId}`,
              // webUrl: `https://localhost:5173/sns/${card.storybookId}`,
              webUrl: shareUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <button id="kakaotalk-sharing-btn" className="share-button" onClick={handleShareClick}>
      <img src={Share} alt="" />
    </button>
  );
};

// PropTypes 정의
KakaoShareButton.propTypes = {
  card: PropTypes.shape({
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    originalImageUrl: PropTypes.string,
    storybookId: PropTypes.number.isRequired,
  }).isRequired,
};

export default KakaoShareButton;
