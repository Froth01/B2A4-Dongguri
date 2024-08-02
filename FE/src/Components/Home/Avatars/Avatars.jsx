import AvatarInfo from './AvatarInfo'
import AvatarList from './AvatarList'
import './css/Avatars.css'

function Avatars() {
  return (
    <div className='avatars'>
      <AvatarInfo />
      <AvatarList />
    </div>
  )
}

export default Avatars