import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import './css/MyWorld.css';
import { useDispatch, useSelector } from 'react-redux';
import { setWorldObject } from '../../../slices/worldInfoSlice';
import MyWorldUpdate from './MyWorldUpdate';

  function MyWorld({userInfo, myCardList}) {
    const dispatch = useDispatch();
    const myWorldRef = useRef(null);
    const worldInfo = useSelector(state => state.worldInfo.object)
    useEffect(() => {
      const randomPosition = (element) => {
      if (!myWorldRef.current) return;

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
  
  // //내 월드 axios요청하여 불러오기
  // useEffect (() => {
  //   async function getWorldInfo (userId) {
  //     const resultAction = await getWorldInfo(userId).unwrap();
  //     // const gaveWorlds = resultAction.payload
  //     dispatch(setWorldObject(resultAction))
  //   }
  //   getWorldInfo(userInfo.userId)
  //   console.log(worldInfo)
  // }, [])
  return (
    <div className="myworld" ref={myWorldRef}>
      <MyWorldUpdate />
      {myCardList.map(card => (
        <img key={card.storybookId} src={card.originalImageUrl} className="floating-image" alt={card.storybookId} />
      ))}
    </div>
  );
};

MyWorld.propTypes = {
  userInfo: PropTypes.object.isRequired,
  myCardList: PropTypes.array.isRequired
}
export default MyWorld;
