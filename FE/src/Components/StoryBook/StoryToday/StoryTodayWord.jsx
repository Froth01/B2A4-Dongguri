import './css/StoryTodayWord.css'
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, setGenre, selectMakeStory } from '../../../slices/makeStorySlice';


const keywords = ["단어1", "단어2", "단어3", "단어4", "단어5"];
const genres = ["HAPPY", "JOY", "PLEASURE", "SAD"];

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


function StoryTodayWord() {
  const dispatch = useDispatch();
  const makeStory = useSelector(selectMakeStory);

  useEffect(() => {
    // 랜덤 단어 선택
    const selectedKeywords = getRandomItems(keywords, 2);
    const randomGenre = getRandomItems(genres, 1)[0];

    console.log('선택된 키워드:', selectedKeywords);
    console.log('선택된 장르:', randomGenre);


    dispatch(setKeyword([...selectedKeywords, '']));
    dispatch(setGenre(randomGenre));
  // }, [dispatch]);
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
          <div className='random-word genre'>{makeStory.genre}</div>
        )}
      </div>

      <div>{makeStory.keywords}, {makeStory.genre}</div>
    </div>
  )
}

export default StoryTodayWord