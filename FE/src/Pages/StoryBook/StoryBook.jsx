import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './css/StoryBook.css'
import StoryMode from "./StoryMode"
import PauseBtn from '../../Components/StoryBook/PauseBtn/PauseBtn'
import StoryFree from "./StoryFree"
import StoryToday from './StoryToday'
import StoryGenre from './StoryGenre'
import StoryImg from './StoryImg'
import StoryImgSelect from './StoryImgSelect'
import StoryKeyword from './StoryKeyword'
import StoryEnd from './StoryEnd'
import StoryRecord from './StoryRecord'
import { resetStory } from '../../slices/makeStorySlice'
import { clearStorybook } from '../../slices/storyBookSlice'
import { addPath, resetPaths } from '../../slices/pathHistorySlice'

function StoryBook() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    // makeStory 리듀서 초기화 할 위치
    const resetPathsArray = ['/storybook', '/storybook/', '/storybook/storymode', '/storybook/storyfree', '/storybook/storytoday']
    // 페이지 경로 저장
    const fullResetPathsArray = [window.location.origin, '/storybook', '/storybook/', '/storybook/storymode', '/storybook/storyfree', ]
    
    console.log('Current Path:', location.pathname)
    dispatch(addPath(location.pathname)) // 현재 경로를 경로 배열에 추가

    if (resetPathsArray.includes(location.pathname)) {
      console.log('Resetting Redux state and path history')
      dispatch(resetStory())
      dispatch(clearStorybook())
    }

    if (fullResetPathsArray.includes(location.pathname)) {
      console.log('Resetting path history')
      dispatch(resetPaths())
    }
  }, [location, dispatch])
  
  return (
    <div className='container'>
      <PauseBtn/>
      <Routes>
          <Route path="/" element={<StoryMode />} />
          <Route path="storymode" element={<StoryMode />} />
          <Route path="storyfree" element={<StoryFree/>} />
          <Route path="storytoday" element={<StoryToday/>} />
          <Route path="storyfree/storygenre" element={<StoryGenre/>} />
          <Route path="storyimg" element={<StoryImg />} />
          <Route path="storyimg/storyimgselect" element={<StoryImgSelect />} />
          <Route path="storykeyword" element={<StoryKeyword />} />
          <Route path="storyend" element={<StoryEnd />} />
          <Route path="storyrecord" element={<StoryRecord />} />
      </Routes>
  

    </div>
  )
}

export default StoryBook