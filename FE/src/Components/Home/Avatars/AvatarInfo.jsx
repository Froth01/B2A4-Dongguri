import AvatarExp from './AvatarExp'
import './css/AvatarInfo.css'

function AvatarInfo() {
  return (
    <div className='avatarinfo'>
      <h3>내 동그리</h3>
      <div className='infodetail'>
        <img src="/img/avatars/geyomi_TWO.png" alt="avatar" />
        <AvatarExp />
      </div>
    </div>
  )
}

export default AvatarInfo