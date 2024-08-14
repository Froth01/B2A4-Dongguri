// AvatarList.jsx
import { getAvatarList } from '../../../slices/avatarSlice';
import AvatarModal from './AvatarModal';
import './css/AvatarList.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvatarRepresentative } from '../../../Api/api';

function AvatarList({ onNameChange, onRepChange, refresh }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.object);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({});
  const [avatarList, setAvatarList] = useState([]);

  const openModal = (id) => {
    const selected = avatarList.find(avatar => avatar.avatarId === id);
    if (selected) {
      setSelectedAvatar(selected);
      setModalOpen(true);
    }
  };

  const levelMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
  };

  const refreshAvatarList = async () => {
    const avatarAction = await dispatch(getAvatarList());
    const gaveAvatars = avatarAction.payload;
    setAvatarList(gaveAvatars);
    onRepChange();
  };

  const refreshRep = async () => {
    // if ( isChanged ) {
    //   if (isAvatarChanged) {
    //   await fetchAvatarRepresentative(avatarId)
    //   }
    //   setModalOpen(false);
    //   onRepChange();
    // } else {
    //   setModalOpen(false);
    //   onRepChange();
    // }
      setModalOpen(false);
  }
  useEffect(() => {
    refreshAvatarList();
  }, [refresh]);

  useEffect(() => {
    // onNameChange가 호출되면 아바타 목록을 새로고침합니다.
    if (onNameChange) {
      refreshAvatarList();
    }
  }, [onNameChange]);

  return (
    <div className='avatarlist'>
      <h3>내가 키운 동그리</h3>
      <div className='listdetail'>
        {avatarList.map((avatar, index) => (
          <div key={index} className='avatar' onClick={() => openModal(avatar.avatarId)}>
            <img src={`/img/avatars/${avatar.avatarType}_${avatar.displayLevel}.png`} alt={avatar.name} />
            <div className='avatar-info'>
              <p className='name'>{avatar.name}</p>
              <p className='level'>Lv. {levelMap[avatar.avatarLevel]}</p>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <AvatarModal
          isOpen={modalOpen}
          onClose={refreshRep}
          avatar={selectedAvatar}
          onNameChange={refreshAvatarList}
          onRepChange={onRepChange} // 이름 변경 시 아바타 목록 새로고침
        />
      )}
    </div>
  );
}
AvatarList.propTypes = {
  onNameChange:PropTypes.func,
  onRepChange: PropTypes.func,
  refresh: PropTypes.bool
}
export default AvatarList;
