import './css//UserInfo.css'
import '../Common/css/UserImg.css'
import UserImg from '../Common/UserImg'
import FollowBtn from './FollowBtn'
// import PropTypes from 'prop-types'
import Follows from './Follows'
import { useSelector } from 'react-redux'

function UserInfo() {
  const userInfo = useSelector(state => state.userInfo.object)
  //test
  console.log(userInfo)

  return (
    <div className='userinfo'>
      <div className='userinfoimg'>
        <UserImg userInfo={userInfo}/>
      </div>
      <div className='userinfomiddle'>
        {userInfo.nickname}
      </div>
      {userInfo.name === 
      // 현재유저정보의 id값 
      1 ? <FollowBtn /> : <Follows userInfo={userInfo} currentUserId={userInfo.userId}/>}
      
    </div>
  )
}

// UserInfo.propTypes = {
//   userInfo:PropTypes.object.isRequired
// }

export default UserInfo