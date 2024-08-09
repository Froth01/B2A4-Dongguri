import './css/StoryTodayWord.css'
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, setGenre, selectMakeStory } from '../../../slices/makeStorySlice';
import { getTodayKeyword } from '../../../Api/api';

const genredMap = {
  '기쁨': 'JOY',
  '행복': 'HAPPY',
  '슬픔': 'SAD',
  '즐거움': 'FUN'
};
 
function convertGenre(genre) {
  return genredMap[genre] || genre; // 매핑된 키워드를 반환, 없으면 원래 키워드를 반환
}

function StoryTodayWord() {
  const dispatch = useDispatch();
  const makeStory = useSelector(selectMakeStory);
  const [originalGenreKeyword, setOriginalGenreKeyword] = useState('')

  useEffect(() => {
    getTodayKeyword()
      .then(response => {
        const { placeKeyword, characterKeyword, genreKeyword } = response.data;
        // 장르 한국어 저장
        setOriginalGenreKeyword(genreKeyword)
        // 장르 영어로 변경
        const convertedGenre = convertGenre(genreKeyword);
        console.log('데이터',placeKeyword, characterKeyword, genreKeyword)
        
        dispatch(setKeyword([placeKeyword, characterKeyword]));
        dispatch(setGenre(convertedGenre));
      })
      .catch(error =>{console.error('오늘의 키워드',error)})

  }, [dispatch]);

  useEffect(() => {
    // 상태가 업데이트될 때마다 로그 출력
    console.log('makestory:', makeStory.keywords, makeStory.genre);
  }, [makeStory]);


  return (
    <div className='todayword-img'>
      <div className="img-container">
        <img src="/img/storybook/storytoday/todayword1.png" alt="주제 이미지 1" />
        {makeStory.keywords[0] && (
          <div className='random-word'>{makeStory.keywords[0]}</div>
        )}
      </div>
      <div className="img-container">
        <img src="/img/storybook/storytoday/todayword2.png" alt="주제 이미지 2" />
        {makeStory.keywords[1] && (
          <div className='random-word'>{makeStory.keywords[1]}</div>
        )}
      </div>
      <div className="img-container">
        <img src="/img/storybook/storytoday/todayword3.png" alt="주제 이미지 3" />
        {makeStory.genre && (
          // <div className='random-word genre'>{makeStory.genre}</div>
          <div className='random-word genre'>{originalGenreKeyword}</div>
        )}
      </div>

      {/* <div>{makeStory.keywords}, {makeStory.genre}</div> */}
    </div>
  )
}

export default StoryTodayWord