import AvatarExp from './AvatarExp'
import Guide from '../../StoryBook/Common/Guide'
import './css/AvatarInfo.css'
import PropTypes from 'prop-types'

function AvatarInfo({avatar, onNameChange, onRepChange}) {
  const representImg = `/img/avatars/${avatar.avatarType}_${avatar.displayLevel}.png`

  const handleNameAndRepChange = () => {
    onNameChange(); 
    onRepChange();  
  };
  return (
    <div className='avatarinfo'>
      <h3>내 동그리</h3>
      <div className='infodetail'>
        <img src={representImg} alt={`${avatar.avatarType} ${avatar.displayLevel}`} />
        {/* <Guide page='storyFree'/> */}
        <AvatarExp avatar={avatar} onNameChange={handleNameAndRepChange}/>
      </div>
    </div>
  )
}

AvatarInfo.propTypes = {
  avatar: PropTypes.object.isRequired,
  onNameChange: PropTypes.func,
  onRepChange: PropTypes.func
}
export default AvatarInfo