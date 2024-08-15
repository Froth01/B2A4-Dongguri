import { useEffect, useState } from 'react'; // useState만 사용하도록 수정
import './css/AvatarExp.css';
import PropTypes from 'prop-types';
import { fetchAvatarName } from '../../../Api/api';

function AvatarExp({ avatar, onNameChange, isModal }) {
  const [isEditing, setIsEditing] = useState(false); // 이름 편집 모드 상태
  const [newName, setNewName] = useState(avatar.name); // 새 이름 상태\

  useEffect(() => {
    if (newName !== avatar.name) {
      setNewName(avatar.name);
    }
  }, [avatar.name]);

  const levelMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
  };

  const done = avatar.exp; // exp를 avatar 객체에서 가져오도록 수정

  // 이름 클릭 시 편집 모드로 전환
  const handleNameClick = () => {
    setIsEditing(true);
  };

  // 이름 입력 변화 처리
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // 입력 완료 시 호출되는 함수 (여기서 API 요청 처리)
  const handleNameSubmit = async () => {
    setIsEditing(false);
    const avatarNameForm = {
      avatarId: avatar.avatarId,
      patchForm: {
        name: newName
      }
    } 
    await fetchAvatarName(avatarNameForm)
    console.log('아바타 이름 변경완료 :', newName);
    onNameChange();
  };

  // 이름 입력 필드가 포커스를 잃었을 때 편집 모드 종료
  const handleBlur = () => {
    handleNameSubmit();
  };

  return (
    <div className="avatarexp">
      <div 
        className={`avatarlv ${isEditing ? '' : 'editable'} ${isModal ? 'ismodalexplv' : ''}`} 
        onClick={handleNameClick}
      >
        {isEditing ? (
          <input 
            type="text" 
            value={newName} 
            onChange={handleNameChange} 
            onBlur={handleBlur} // 포커스를 잃으면 이름 변경 완료
            autoFocus // 편집 모드가 되면 자동으로 입력 필드에 포커스
          />
        ) : (
          <>
            {newName}  Lv. {levelMap[avatar.avatarLevel]} {/* avatar.avatarLevel을 사용 */}
          </>
        )}
      </div>
      <div className={`expdetail ${isModal ? 'ismodaldetail': ''}`}>
        {[...Array(parseInt(done)).keys()].map((num) => (
          <div key={`${num}-open`} className='book'>
            <img src="/img/avatars/bookopen.png" alt="exp1" />
          </div>
        ))}
        {[...Array(parseInt(10-done)).keys()].map((num) => (
          <div key={`${num}-close`} className='book'>
            <img src="/img/avatars/bookclose.png" alt="exp0" />
          </div>
        ))}
      </div>
      <div className={`avatarword ${isModal ? 'ismodalexp' : ''}`}>
        {done < 4 ? 
        <h4>동화를 {4-done}권 더 만들면 동그리가 자라나요!</h4> :
        done < 10 ?
        <h4>동화를 {10-done}권 더 만들면 동그리가 자라나요!</h4> :
        <h4>동그리가 다 컸어요!</h4>
        }
      </div>
    </div>
  );
}

AvatarExp.propTypes = {
  avatar: PropTypes.object.isRequired,
  onNameChange: PropTypes.func,
  isModal: PropTypes.bool
};

export default AvatarExp;
