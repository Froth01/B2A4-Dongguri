import './css/UserImg.css'
import { useSelector } from 'react-redux'

function UserImg() {
  const userInfo = useSelector(state => state.userInfo.object)
  return (
    <div className='userimg'>
      
      <img src={userInfo.id != null ? userInfo.profileImageUrl : '/img/home/userdefault.png'} alt="profile" />
    </div>
  )
}

export default UserImg