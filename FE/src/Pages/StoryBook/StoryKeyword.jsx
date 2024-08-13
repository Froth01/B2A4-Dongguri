

import { useState, useEffect } from 'react';
import './css/StoryKeyword.css';
import Guide from "../../Components/StoryBook/Common/Guide";
import NextBtn from "../../Components/StoryBook/Common/NextBtn";
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput";
import { useSelector, useDispatch } from "react-redux";
import { selectKeyword, selectOriginalImageUrl, selectMakeStory } from "../../slices/makeStorySlice";
import { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl } from "../../slices/storyBookSlice";
import { transformStorybook } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../Components/StoryBook/Common/LoadingModal'; // 추가한 모달 컴포넌트

const StoryKeyword = () => {
  const keywords = useSelector(selectKeyword);
  const originalImageUrl = useSelector(selectOriginalImageUrl);
  const makeStory = useSelector(selectMakeStory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 컴포넌트 내 로딩 상태 관리

  const disabled = !keywords.some(keyword => keyword.trim() !== '');

  useEffect(() => {
    console.log('loading state changed:', loading);
  }, [loading]); // loading 상태가 변경될 때마다 로그 출력

  const handleNextClick = async (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    setLoading(true); // 로딩 상태를 true로 변경
    console.log('Setting loading to true:', loading);

    try {
      const formData = new FormData();
      formData.append('genre', makeStory.genre);
      formData.append('transformType', makeStory.transformType);
      formData.append('originalImageUrl', makeStory.originalImageUrl);
      makeStory.keywords.filter(keyword => keyword !== "").forEach((keyword, index) => {
        formData.append(`keywords[${index}]`, keyword);
      });

      console.log('로딩창 뜨나?:', loading);
      console.log(makeStory.genre,
        makeStory.transformType,
        makeStory.originalImageUrl,
        makeStory.keywords);

      const response = await transformStorybook(formData);
      console.log('기다리는중1');
      const data = response.data;
      console.log('기다리는중2');
      console.log('data', data);
      console.log('장르테스트', data.genre);

      // 리덕스에 저장
      dispatch(setGenre(data.genre));
      dispatch(setKeywords(data.keywords));
      dispatch(setContent(data.content));
      dispatch(setOriginalImageUrl(data.originalImageUrl));
      dispatch(setTransformedImageUrl(data.transformedImageUrl));

      setLoading(true); // 로딩 상태를 false로 변경
      // navigate('/storybook/storyend'); // 응답을 받은 후에 페이지 이동
    } catch (error) {
      console.error('API 요청 실패:', error);
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div className="page-container">
      <LoadingModal isOpen={loading} /> {/* 로딩 모달 추가 */}
      <Guide page="storyKeyword"/>

      <div className="keyword-wrapper">
        <div className='keyword-left'>
          <img 
            src="/img/storybook/storyimg/StoryImg.png"
            alt="기본 이미지"
            className="base-image"
          />
          <img src={originalImageUrl} alt="업로드된 이미지" className="uploaded-image"/>
        </div>
        <div className="keyword-right">
          <div className="keyword-input-grid">
            {keywords.map((keyword, index) => (
              <StoryKeywordInput key={index} index={index} />
            ))}
          </div>
          <div className="keyword-nextbtn">
            <NextBtn onClick={handleNextClick} disabled={disabled} />
          </div>
        </div>
      </div>
      <div className="redux-state">
        <h3>Redux State:</h3>
        <pre>{JSON.stringify(makeStory, null, 2)}</pre>
      </div>
    </div>
  );
}

export default StoryKeyword;
