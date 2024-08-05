import { useEffect, useRef } from 'react';
import './css/MyWorld.css';

const MyWorld = () => {
  const myWorldRef = useRef(null);

  useEffect(() => {
    const randomPosition = (element) => {
      if (!myWorldRef.current) return;

      const { clientWidth, clientHeight } = myWorldRef.current;
      const { offsetWidth, offsetHeight } = element;

      // 이미지가 화면 밖으로 나가지 않도록 조정
      const x = Math.floor(Math.random() * 1000);
      const y = Math.floor(Math.random() * 500);
      element.style.transform = `translate(${x}px, ${y}px)`;
    };

    const animateImages = () => {
      const images = myWorldRef.current.querySelectorAll('.floating-image');
      images.forEach((image) => {
        randomPosition(image);
      });
    };

    animateImages(); // 초기 위치 설정
    const intervalId = setInterval(animateImages, 5000); // 5초마다 위치 변경

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="myworld" ref={myWorldRef}>
      <img src="/img/avatars/bini_ONE.png" className="floating-image" alt="이미지 1" />
      <img src="/img/avatars/geyomi_ONE.png" className="floating-image" alt="이미지 2" />
      <img src="/img/avatars/geyomi_ONE.png" className="floating-image" alt="이미지 3" />
      <img src="/img/avatars/geyomi_ONE.png" className="floating-image" alt="이미지 4" />
      <img src="/img/avatars/geyomi_ONE.png" className="floating-image" alt="이미지 5" />
      <img src="/img/avatars/geyomi_ONE.png" className="floating-image" alt="이미지 6" />
    </div>
  );
};

export default MyWorld;
