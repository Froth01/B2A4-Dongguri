import { Routes, Route } from 'react-router-dom'
import './App.css'
import StoryBook from './Pages/StoryBook/StoryBook'
import Home from './Pages/Home'
function App() {

  return (
    <div className='app'>
      <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/storybook/*" element={<StoryBook />} />
      </Routes>
    </div>
  )
}

export default App
