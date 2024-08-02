import { useState } from 'react';
import './css/Follows.css';
import PropTypes from 'prop-types';
import FollowModal from './FollowModal';

function Follows({userInfo, currentUserId}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('followers');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  //비동기 팔로잉 목록 조회

  //비동기 팔로워 목록 조회
  const dummyUsers = [
    { id: 2, name: "User 2", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { id: 3, name: "User 3", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { id: 4, name: "User 4", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { id: 5, name: "User 5", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { id: 6, name: "User 6", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { id: 7, name: "User 7", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { id: 8, name: "User 8", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { id: 9, name: "User 9", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { id: 10, name: "User 10", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    // ... 더 많은 사용자
  ];

  return (
    <div className='follows'>
      <div className='followinfo' onClick={() => openModal('following')}>
        <div className="follownum">
          123123
        </div>
        <h2>팔로우</h2>
      </div>
      <div className='followinfo' onClick={() => openModal('followers')}>
        <div className="follownum">
          123123
        </div>
        <h2>팔로워</h2>
      </div>
      {modalOpen && (
        <FollowModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
          users={dummyUsers}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}

Follows.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default Follows;