
import './css/StoryKeyword.css';
import Guide from "../../Components/StoryBook/Common/Guide";
import NextBtn from "../../Components/StoryBook/Common/NextBtn";
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput";
import { useSelector } from "react-redux";
import { selectKeyword, selectOriginalImageUrl, selectMakeStory } from "../../slices/makeStorySlice";
import { transformStorybook } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const StoryKeyword = () => {
  const keywords = useSelector(selectKeyword);
  const originalImageUrl = useSelector(selectOriginalImageUrl);
  const makeStory = useSelector(selectMakeStory);
  const navigate = useNavigate();

  const disabled = !keywords.some(keyword => keyword.trim() !== '');

  const handleNextClick = async (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    try {
      // Base64 데이터를 Blob으로 변환
      const base64Response = await fetch(originalImageUrl);
      const blob = await base64Response.blob();
      console.log('Blob 변환 성공:', blob); // Blob 변환 성공 확인

      // FormData 객체 생성
      const formData = new FormData();
      formData.append('genre', makeStory.genre);
      formData.append('transformType', makeStory.transformType);
      formData.append('originalImage', blob); // Blob 데이터를 추가
      makeStory.keyword.forEach((keyword, index) => {
        formData.append(`keyword[${index}]`, keyword);
      });

      await transformStorybook(formData);
      navigate('/storybook/storyend');
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <div className="page-container">
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
            <NextBtn to='/storybook/storyend' onClick={handleNextClick} disabled={disabled} />
          </div>
        </div>
      </div>
      <div className="redux-state">
        <h3>Redux State:</h3>
        <pre>{JSON.stringify(makeStory, null, 2)}</pre>
      </div>

    </div>
  )
}

export default StoryKeyword;
