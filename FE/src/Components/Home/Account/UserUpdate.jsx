import './css/UserUpdate.css'
import { useSelector } from 'react-redux'

function UserUpdate() {
  const userInfo = useSelector(state => state.userInfo.object)

  return (
    <div className='userupdate'>
      <div>
      {userInfo.id}
      </div>
    </div>
  )
}

export default UserUpdate