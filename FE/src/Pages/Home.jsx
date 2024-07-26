import './css/Home.css'
import Navbar from '../Components/Home/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import StoryWorld from '../Components/Home/StoryWorld/StoryWorld'


function Home() {
  return (
    <div className='home'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StoryWorld />} />
      </Routes>
    </div>
  )
}

export default Home