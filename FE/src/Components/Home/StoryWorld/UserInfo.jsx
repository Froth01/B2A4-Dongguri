import './css//UserInfo.css'
import '../Common/css/UserImg.css'
import UserImg from '../Common/UserImg'
import FollowBtn from './FollowBtn'
// import PropTypes from 'prop-types'
import Follows from './Follows'
import { useSelector } from 'react-redux'

function UserInfo() {
  const currentUser = useSelector(state => state.auth.object)
  const userInfo = useSelector(state => state.userInfo.object)
  console.log('UserInfo > targetUser : ',userInfo)
  return (
    <div className='userinfo'>
      <div className='userinfoimg'>
        <UserImg userInfo={userInfo}/>
      </div>
      <div className='userinfomiddle'>
        {userInfo.nickname}
      </div>
      {userInfo.userId != currentUser.userId ? <FollowBtn /> : <Follows />}
      
    </div>
  )
}

// UserInfo.propTypes = {
//   userInfo:PropTypes.object.isRequired
// }

export default UserInfo