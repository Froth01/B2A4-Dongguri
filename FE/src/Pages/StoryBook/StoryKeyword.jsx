
import './css/StoryKeyword.css';
import Guide from "../../Components/StoryBook/Common/Guide";
import NextBtn from "../../Components/StoryBook/Common/NextBtn";
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput";
import { useSelector, useDispatch } from "react-redux";
import { selectKeyword, selectOriginalImageUrl, selectMakeStory } from "../../slices/makeStorySlice";
import { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl } from "../../slices/storyBookSlice";
import { transformStorybook } from '../../Api/api';
import { useNavigate } from 'react-router-dom';

const StoryKeyword = () => {
  const keywords = useSelector(selectKeyword);
  const originalImageUrl = useSelector(selectOriginalImageUrl);
  const makeStory = useSelector(selectMakeStory);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const disabled = !keywords.some(keywords => keywords.trim() !== '');

  const handleNextClick = async (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    try {
      
      // const formData = new FormData();
      // formData.append('genre', makeStory.genre);
      // formData.append('transformType', makeStory.transformType);
      // formData.append('originalImageUrl', makeStory.originalImageUrl);
      // makeStory.keywords.forEach((keywords, index) => {
      //   formData.append(`keywords[${index}]`, keywords);
      // });
      console.log(makeStory.genre,
        makeStory.transformType,
        makeStory.originalImageUrl,
        makeStory.keywords)

      const response = await transformStorybook(
        makeStory.genre,
        makeStory.transformType,
        makeStory.originalImageUrl,
        makeStory.keywords
      )
      console.log('기다리는중1')
      const data = await response.json()
      console.log('기다리는중2')
      console.log('data',data)
      
      // 리덕스에 저장
      dispatch(setGenre(data.genre));
      dispatch(setKeywords(data.keywords));
      dispatch(setContent(data.content));
      dispatch(setOriginalImageUrl(data.originalImageUrl));
      dispatch(setTransformedImageUrl(data.transformedImageUrl));

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
