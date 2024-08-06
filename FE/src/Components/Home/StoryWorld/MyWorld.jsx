import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import './css/MyWorld.css';
import { getCardList } from '../../../slices/cardListSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const MyWorld = ({userInfo}) => {
  const myWorldRef = useRef(null);
  const [myCardList, setMyCardList] = useState([]) 
  const dispatch = useDispatch();
  const exceptList = useSelector(state => state.cardList.list)

  useEffect(() =>{
    async function getList (userInfo) {
      const getCardForm = {
        type: 'mine',
        userId: userInfo.id
      }
    try {
      const actionResult = await dispatch(getCardList(getCardForm))
      const gaveList = unwrapResult(actionResult)
      setMyCardList(gaveList)
    } catch {
      error => { throw error; }
      setMyCardList(exceptList)
    }}
    getList(userInfo);
  }
  ,[])

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
 
  return (
    <div className="myworld" ref={myWorldRef}>
      {myCardList.map(card => (
        <img key={card.storybookId} src={card.originalImageUrl} className="floating-image" alt={card.storybookId} />
      ))}
    </div>
  );
};

MyWorld.propTypes = {
  userInfo: PropTypes.object.isRequired
}
export default MyWorld;
