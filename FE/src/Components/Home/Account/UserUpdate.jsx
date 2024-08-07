import UserForm from './UserForm'
import './css/UserUpdate.css'
import { useSelector } from 'react-redux'

function UserUpdate() {
  const userInfo = useSelector(state => state.auth.object)

  return (
    <div className='userupdate'>
      <UserForm userInfo={userInfo}/>
    </div>
  )
}

export default UserUpdate