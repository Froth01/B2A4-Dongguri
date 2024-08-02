import { Routes, Route } from 'react-router-dom'
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

function StoryBook() {
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