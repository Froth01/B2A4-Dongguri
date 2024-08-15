import AvatarExp from './AvatarExp'
import Guide from '../../StoryBook/Common/Guide'
import './css/AvatarInfo.css'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectDialogs } from '../../../slices/guideSlice'

function AvatarInfo({avatar, onNameChange, onRepChange, isModal}) {
  const representImg = `/img/avatars/${avatar.avatarType}_${avatar.displayLevel}.png`
  const dialogList = useSelector(selectDialogs)

  const handleNameAndRepChange = () => {
    onNameChange(); 
    onRepChange();  
  };

  return (
    <div className='avatarinfo'>
      <h3>{isModal ? '동그리 정보' : '대표 동그리'}</h3>
      <div className='infodetail'>
        <img className='avatarimg' src={representImg} alt={`${avatar.avatarType} ${avatar.displayLevel}`} />
        <div className={`avatardialog ${isModal ? 'ismodal' : ''}`}>
          <img src="/img/avatars/avatardialog.png" alt="dialog" />
          <div className={`dialogdiv ${isModal ? 'ismodal' : ''}`}>{dialogList['avatar'][avatar.avatarType][avatar.displayLevel]}</div>
        </div>
        <AvatarExp avatar={avatar} onNameChange={handleNameAndRepChange} isModal={isModal}/>
      </div>
    </div>
  )
}

AvatarInfo.propTypes = {
  avatar: PropTypes.object.isRequired,
  onNameChange: PropTypes.func,
  onRepChange: PropTypes.func,
  isModal:PropTypes.bool
}
export default AvatarInfo