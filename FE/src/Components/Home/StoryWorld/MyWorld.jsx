import { useEffect, useRef, useState } from 'react';
import './css/MyWorld.css';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { getWorldInfo, setWorldObject } from '../../../slices/worldInfoSlice';
import MyWorldBackgroundUpdate from './MyWorldBackgroundUpdate';
import MyWorldImgUpdate from './MyWorldImgUpdate';

function MyWorld({myCardList}) {
  const currentUser = useSelector(state => state.auth.object)
  const userInfo = useSelector(state => state.userInfo.object)
  const dispatch = useDispatch();
  const worldInfo = useSelector(state => state.worldInfo.object)
  const [storybooks, setStorybooks] = useState([])
  const [backgroundUrl, setBackgroundUrl] = useState('')
  const myWorldRef = useRef(null);

  // 이미지 움직이는거
  useEffect(() => {
    const randomPosition = (element) => {
      if (!myWorldRef.current) return;

      // 이미지가 화면 밖으로 나가지 않도록 조정
      const x = Math.floor(Math.random() * 1000);
      const y = Math.floor(Math.random() * 500);
      element.style.transform = `translate(${x}px, ${y}px)`;
    };

    const animateImage = (image) => {
      randomPosition(image);

      // 다음 움직임을 랜덤 시간에 설정 (2000ms ~ 5000ms)
      const randomTime = Math.floor(Math.random() * 3000) + 2000;
      setTimeout(() => animateImage(image), randomTime);
    };

    const animateImages = () => {
      const images = myWorldRef.current.querySelectorAll('.floating-image');
      images.forEach((image) => {
        animateImage(image); // 각 이미지를 개별적으로 애니메이션 설정
      });
    };

    animateImages(); // 초기 위치 설정

    // 컴포넌트가 언마운트될 때 타임아웃 정리
    return () => {
      const images = myWorldRef.current.querySelectorAll('.floating-image');
      images.forEach((image) => {
        clearTimeout(image.timeoutId);
      });
    };
  }, []);

  //내 월드 axios요청하여 불러오기
  useEffect (() => {
    async function fetchWorldInfo (userId) {
      try {
        const resultAction = await dispatch(getWorldInfo(userId))
        const gaveWorld = resultAction.payload
        dispatch(setWorldObject(gaveWorld))
      } catch {
        error => {throw error;};
      }}
    if (userInfo.userId) {
      fetchWorldInfo(userInfo.userId)
    }
  }, [dispatch, userInfo.userId])

  useEffect (() => {
    if (worldInfo && worldInfo.backgroundType !== 'CUSTOM') {
      setStorybooks(worldInfo.storybooks)
      setBackgroundUrl(`/img/storyworld/${worldInfo.backgroundType}.jpg`)
      console.log('MyWorld > worldInfo FIXED : ', worldInfo)
    } else if (worldInfo && worldInfo.backgroundType === 'CUSTOM') {
      setStorybooks(worldInfo.storybooks)
      setBackgroundUrl(worldInfo.customBackgroundUrl)
      console.log('MyWorld > worldInfo CUSTOM : ', worldInfo)
    } 
  }, [worldInfo])

  return (
    <div className="myworld" style={{backgroundImage : `url(${backgroundUrl})`}} ref={myWorldRef}>
      {currentUser.userId === userInfo.userId ?
        <MyWorldBackgroundUpdate /> : null}
      {currentUser.userId === userInfo.userId ?
        <MyWorldImgUpdate myCardList={myCardList}/> : null}
      {storybooks.map(card => (
        <img key={card.storybookId} src={card.transparentImageUrl} className="floating-image" alt={card.storybookId} />
      ))}
    </div>
  );
}

MyWorld.propTypes = {
  myCardList: PropTypes.array.isRequired
}

export default MyWorld;