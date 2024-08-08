import { useSelector } from 'react-redux'
import './css/UserImg.css'
import PropTypes from 'prop-types'

function UserImg({userInfo}) {
  console.log(userInfo)
  const currentUser = useSelector(state => state.auth.object)
  console.log(currentUser)
  return (
    <div className='userimg'>    
      <img src={userInfo.userId != 0 ? userInfo.profileImageUrl : '/img/home/userdefault.png'} alt="profile" />
    </div>
  )
}

UserImg.propTypes = {
  userInfo:PropTypes.object
}

export default UserImg