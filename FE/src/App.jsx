import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import StoryBook from './Components/StoryBook/StoryBook'
import Home from './Components/Home/Home'
function App() {

  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/storybook" element={<StoryBook />} />
      </Route>
    </Routes>
  )
}

export default App
