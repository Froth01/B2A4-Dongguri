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
import Logout from './Logout'
import PrivateRoute from '../../PrivateRoute';
import SnsDetail from '../../Components/Home/SNS/SnsDetail'

function Home() {
  
  return (
    <div className='home'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/avatars" element={<PrivateRoute> <Avatars /></PrivateRoute>} />
        <Route path='/storyworld/:userId' element={<PrivateRoute> <StoryWorld /></PrivateRoute>} />
        {/* <Route path='/sns' element={<PrivateRoute> <SNS /> </PrivateRoute>} /> */}
        <Route path='/sns' element={<SNS /> } />
        <Route path='/login' element={<Login />}/>
        <Route path="/kakao-callback" element={<KakaoCallback />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/users/:userId' element={<PrivateRoute> <UserUpdate /> </PrivateRoute>} />
        <Route path="/users/logout" element={<PrivateRoute> <Logout /> </PrivateRoute>} />
        <Route path="/sns/:storybookId" element={<SnsDetail />} />
      </Routes>
    </div>
  )
}

export default Home