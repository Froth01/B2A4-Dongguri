import PropTypes from 'prop-types';
import './css/AvatarModal.css';
import { useState } from 'react';
import AvatarInfo from './AvatarInfo';
import { fetchAvatarDisplayLevel } from '../../../Api/api';

function AvatarModal({ isOpen, onClose, avatar, onNameChange }) {
  const [selectedLevel, setSelectedLevel] = useState(avatar.displayLevel);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false)

  const levelRequirements = {
    'ONE': 0,
    'TWO': 4,
    'THREE': 10
  };
  const levelMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
  }
  // 레벨 선택 시 처리 함수
  const handleLevelClick = async (level, avatar) => {
    if (avatar.exp >= levelRequirements[level]) {
      setSelectedLevel(level);
      const avatarLevelForm = {
        avatarId: avatar.avatarId,
        avatarLevel: level
      }
      console.log('요청보내는폼 : ', avatarLevelForm)
      await fetchAvatarDisplayLevel(avatarLevelForm)
      if (!avatar.isRepresentative) {
        setIsAvatarChanged(true)
      }
    }
  };

  // 이름변경시 전달
  const handleNameChange = () => {
    if (onNameChange) {
      onNameChange(); // 이름이 변경되면 AvatarList에 알림
    }
  };

  // 클릭시 인자로 변경내용 전달하려고 리스너

  if (!isOpen) return null;

  console.log('모달로 받은 아바타정보 :',avatar)

  return (
    <div className="a-modal-overlay" onClick={() => onClose(isAvatarChanged, avatar.avatarId)}>
      <div className="a-modal-content" onClick={e => e.stopPropagation()}>
        <AvatarInfo avatar={avatar} onNameChange={handleNameChange}/>
        <div className='avatarlevel'>
          {Object.keys(levelRequirements).map((level) => (
            <div
              key={level}
              className={`level ${selectedLevel === level ? 'selected' : ''} ${avatar.exp >= levelRequirements[level] ? 'unlocked' : 'locked'}`}
              onClick={() => handleLevelClick(level, avatar)}
            >
              <img src={`/img/avatars/${avatar.avatarType}_${level}.png`} alt={avatar.name} />
              <button>Lv. {levelMap[level]}</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onClose(isAvatarChanged, avatar.avatarId)} className="f-close-button">X</button>
    </div>
  );
}

AvatarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  avatar: PropTypes.object.isRequired,
  onNameChange: PropTypes.func.isRequired
};

export default AvatarModal;
