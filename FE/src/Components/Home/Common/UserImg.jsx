import { useSelector } from 'react-redux'
import './css/UserImg.css'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

function UserImg({userInfo}) {
  const currentUser = useSelector(state => state.auth.object)
  useEffect(() => {
    console.log('UserImg > currentUser :',currentUser)
  },[])
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