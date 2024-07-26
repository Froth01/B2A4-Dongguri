import './css/Home.css'
import Navbar from '../Components/Home/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Avatars from '../Components/Home/Avatars/Avatars'
import Main from '../Components/Home/Main'


function Home() {
  return (
    <div className='home'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/avatars" element={<Avatars />} />
      </Routes>
    </div>
  )
}

export default Home