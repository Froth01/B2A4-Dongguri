import PropTypes from 'prop-types';
import './css/FollowModal.css';
import { useState } from 'react';

function FollowModal({ isOpen, onClose, type, users: initialUsers, currentUserId }) {
  const [users, setUsers ] = useState(initialUsers)

  if (!isOpen) return null;

  const toggleFollow = (userId) => {
    // 상태 업데이트: 불변성을 유지하기 위해 새로운 배열 생성
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing } // 상태 변경
          : user
      )
    );
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{type === 'followers' ? '팔로워' : '팔로우'}</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <img src={user.profileImg} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              {type === 'followers' && user.id !== currentUserId && (
                <button className={`follow-button ${user.isFollowing ? 'following' : ''}`} onClick={()=> toggleFollow(user.id)} >
                  <span className="follow-text">{user.isFollowing ? '팔로우 중' : '팔로우'}</span>
                  <span className="unfollow-text">언팔로우</span>
                </button>
              )}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">닫기</button>
      </div>
    </div>
  );
}

FollowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['followers', 'following']).isRequired,
  users: PropTypes.array.isRequired,
  currentUserId: PropTypes.number.isRequired
};

export default FollowModal;