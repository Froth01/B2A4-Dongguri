import './css//UserInfo.css'
import '../Common/css/UserImg.css'
import UserImg from '../Common/UserImg'
import FollowBtn from './FollowBtn'
import PropTypes from 'prop-types'
import Follows from './Follows'

function UserInfo({userInfo}) {

  //test
  const currentUserId = 1;

  return (
    <div className='userinfo'>
      <div className='userinfoimg'>
        <UserImg userInfo={userInfo}/>
      </div>
      <div className='userinfomiddle'>
        {userInfo.name}
      </div>
      {userInfo.name === 
      // 현재유저정보의 id값 
      1 ? <FollowBtn /> : <Follows userInfo={userInfo} currentUserId={currentUserId}/>}
      
    </div>
  )
}

UserInfo.propTypes = {
  userInfo:PropTypes.object.isRequired
}

export default UserInfo