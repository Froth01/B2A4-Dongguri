import './css/Home.css'
import Navbar from '../../Components/Home/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Avatars from '../../Components/Home/Avatars/Avatars'
import Main from '../../Components/Home/Main'
import StoryWorld from '../../Components/Home/StoryWorld/StoryWorld'
import SNS from '../../Components/Home/SNS/SNS'
import Login from './Login'
import Signup from './Signup'
import KakaoCallback from '../../Components/Home/Users/KakaoCallback'
import UserUpdate from '../../Components/Home/Account/UserUpdate'
import { useSelector } from 'react-redux'


function Home() {
  const userInfo = useSelector(state => state.userInfo.object)
  return (
    <div className='home'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/storyworld/*" element={<StoryWorld />} />
        <Route path='/sns' element={<SNS />} />
        <Route path='/login' element={<Login />}/>
        <Route path="/kakao-callback" element={<KakaoCallback />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path={`/users/${userInfo.userId}`} element={<UserUpdate />} />
      </Routes>
    </div>
  )
}

export default Home