import AvatarModal from './AvatarModal';
import './css/AvatarList.css'
import { useState } from 'react';

function AvatarList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState({})
  const openModal = (id) => {
    setModalType(id)
    setSelectedAvatar(avatarList[id])
    setModalOpen(true);
  };
  const levelMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,

  }
  const avatarList = [
    {
			"id": 1,
			"name": "겨미",
			"avatarType": "geyomi",
			"avatarLevel": "ONE",
			"exp": 1,
			"isRepresentative": true,
			"displayLevel": "ONE",
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
		},
    {
			"id": 2,
			"name": "거니",
			"avatarType": "geoni",
			"avatarLevel": "TWO",
			"exp": 1,
			"isRepresentative": true,
			"displayLevel": "TWO",
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
		},
    {
			"id": 3,
			"name": "일이",
			"avatarType": "ili",
			"avatarLevel": "TWO",
			"exp": 1,
			"isRepresentative": true,
			"displayLevel": "TWO",
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
		},
    {
			"id": 4,
			"name": "비니",
			"avatarType": "bini",
			"avatarLevel": "THREE",
			"exp": 1,
			"isRepresentative": true,
			"displayLevel": "THREE",
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
		},
    {
			"id": 5,
			"name": "미니",
			"avatarType": "minni",
			"avatarLevel": "THREE",
			"exp": 1,
			"isRepresentative": true,
			"displayLevel": "THREE",
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
		},
  ]
  return (
    <div className='avatarlist'>
      <h3>내가 키운 동그리</h3>
      <div className='listdetail'>
        {avatarList.map((avatar, index) => (
          <div key={index} className='avatar' onClick={() => openModal(avatar.id)}>
          <img src={`/img/avatars/${avatar.avatarType}_${avatar.displayLevel}.png`} alt={avatar.name} />
          <div className='avatar-info'>
            <p className='name'>{avatar.name}</p>
            <p className='level'>Lv .{levelMap[avatar.avatarLevel]}</p>
          </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <AvatarModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          id={modalType}
          avatar={selectedAvatar}
        />
      )}
    </div>
  )
}

export default AvatarList