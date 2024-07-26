import { Routes, Route } from 'react-router-dom'
import StoryMode from "./StoryMode"
import StoryFree from "./StoryFree"
import StoryToday from './StoryToday'

function StoryBook() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<StoryMode />} />
          <Route path="storymode" element={<StoryMode />} />
          <Route path="storyfree" element={<StoryFree/>} />
          <Route path="storytoday" element={<StoryToday/>} />
      </Routes>
  

    </div>
  )
}

export default StoryBook