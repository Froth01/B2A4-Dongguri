import './css//UserInfo.css'
import '../Navbar/css/UserImg.css'
import UserImg from '../Navbar/UserImg'

function UserInfo() {
  return (
    <div className='userinfo'>
      <UserImg />
      <div className='userinfomiddle'>
        middle
      </div>
      <div>
        follow button
      </div>
    </div>
  )
}

export default UserInfo