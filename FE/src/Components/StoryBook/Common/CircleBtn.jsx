import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTransformType, selectTransformType, selectMakeStory } from "../../../slices/makeStorySlice"
import { selectCircleBtnList } from "../../../slices/circleBtnSlice";
import { selectPathHistory } from '../../../slices/pathHistorySlice';
import { transformStorybook } from "../../../Api/api";
import { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl } from "../../../slices/storyBookSlice"
import './css/CircleBtn.css'
import LoadingModal from '../../StoryBook/Common/LoadingModal'

function CircleBtn() {
  const circleBtnList = useSelector(selectCircleBtnList);
  const selectedTransformType = useSelector(selectTransformType);
  const pathHistory = useSelector(selectPathHistory);
  const makeStory = useSelector(selectMakeStory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 컴포넌트 내 로딩 상태 관리
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleTransformTypeClick = async (transfromType, to) => {
    dispatch(setTransformType(transfromType));
    console.log('TransformType selected:', transfromType);
    console.log('Current genre in state:', selectedTransformType);

    if (pathHistory.includes('/storybook/storytoday')) {
      setLoading(true); // 로딩 상태를 true로 변경
      console.log('Setting loading to true:', loading);
      try {
        const formData = new FormData();
      formData.append('genre', makeStory.genre);
      formData.append('transformType', makeStory.transformType);
      formData.append('originalImageUrl', makeStory.originalImageUrl);
      makeStory.keywords.forEach((keywords, index) => {
        formData.append(`keywords[${index}]`, keywords);
      });

      console.log('오늘의 주제',
        makeStory.genre,
        makeStory.transformType,
        makeStory.originalImageUrl,
        makeStory.keywords)
        
        const response = await transformStorybook(formData)
      console.log('기다리는중1')
      console.log(response)
      // const data = await response.json()
      const data = response.data
      console.log('기다리는중2')
      console.log('data',data)
      console.log('장르테스트',data.genre)
      
        // 리덕스에 저장
      dispatch(setGenre(data.genre));
      dispatch(setKeywords(data.keywords));
      dispatch(setContent(data.content));
      dispatch(setOriginalImageUrl(data.originalImageUrl));
      dispatch(setTransformedImageUrl(data.transformedImageUrl));

        // API 요청 보내기
        // await transformStorybook(formData);

        setLoading(false);
        // 페이지 이동
        navigate('/storybook/storyend');
      } catch (error) {
        console.error('API 요청 실패:', error);
        setLoading(false);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <div className="circlebtn">
      <LoadingModal isOpen={loading} /> {/* 로딩 모달 추가 */}
      {circleBtnList.map(([images, alt, to, transfromType], index) => (
        <div 
          key={index} 
          onClick={() => handleTransformTypeClick(transfromType, to)} 
          className="circle-link"
          onMouseEnter={() => setHoveredIndex(index)} // hover 상태 설정
          onMouseLeave={() => setHoveredIndex(null)}  // hover 상태 해제
        >
          <img src={hoveredIndex === index ? images[1] : images[0]} alt={alt} />
        </div>
      ))}
    </div>
  );
}

export default CircleBtn;
