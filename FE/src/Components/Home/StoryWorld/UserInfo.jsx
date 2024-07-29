import './css//UserInfo.css'
import '../Common/css/UserImg.css'
import UserImg from '../Common/UserImg'
import FollowBtn from './FollowBtn'

function UserInfo() {
  return (
    <div className='userinfo'>
      <UserImg />
      <div className='userinfomiddle'>
        <p>username</p>
      </div>
      <FollowBtn />
    </div>
  )
}

export default UserInfo