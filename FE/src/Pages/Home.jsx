import './css/Home.css'
import Navbar from '../Components/Home/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import StoryWorld from '../Components/Home/StoryWorld/StoryWorld'
import Avatars from '../Components/Home/Avatars/Avatars'


function Home() {
  return (
    <div className='home'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StoryWorld />} />
        <Route path="/avatars" element={<Avatars />} />
      </Routes>
    </div>
  )
}

export default Home