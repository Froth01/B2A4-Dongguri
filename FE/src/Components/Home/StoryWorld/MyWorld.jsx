import { useEffect, useRef, useState } from 'react';
import './css/MyWorld.css';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { getWorldInfo, setWorldObject } from '../../../slices/worldInfoSlice';
import MyWorldBackgroundUpdate from './MyWorldBackgroundUpdate';
import MyWorldImgUpdate from './MyWorldImgUpdate';

  function MyWorld({myCardList}) {
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
  
  //내 월드 axios요청하여 불러오기
  useEffect (() => {
    async function fetchWorldInfo (userId) {
      try {
      const resultAction = await dispatch(getWorldInfo(userId))
      const gaveWorld = resultAction.payload
      console.log('gave world : ', gaveWorld)
      dispatch(setWorldObject(gaveWorld))
    } catch {
      error => {throw error;};
    }}
    if (userInfo.userId) {
    fetchWorldInfo(userInfo.userId)
    }
  }, [dispatch, userInfo.userId])

  useEffect (() => {
    if (worldInfo && worldInfo.backgroundType !='CUSTOM') {
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
      <MyWorldBackgroundUpdate />
      <MyWorldImgUpdate />
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
