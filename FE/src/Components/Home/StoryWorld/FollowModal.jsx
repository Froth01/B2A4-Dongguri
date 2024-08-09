import PropTypes from 'prop-types';
import './css/FollowModal.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function FollowModal({ isOpen, onClose, type, userList }) {
  const [users, setUsers] = useState(userList)
  const currentUser = useSelector(state => state.auth.object)
  if (!isOpen) return null;

  const toggleFollow = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.userId === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  return (
    <div className="f-modal-overlay" onClick={onClose}>
      <div className="f-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{type === 'followers' ? '팔로워' : '팔로우'}</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.userId} className="user-item">
              <img src={user.profileImg} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              {type === 'followers' && user.userId !== currentUser.userId && (
                <button className={`follow-button ${user.isFollowing ? 'following' : ''}`} onClick={() => toggleFollow(user.userId)}>
                  <span className="follow-text">{user.isFollowing ? '팔로우 중' : '팔로우'}</span>
                  <span className="unfollow-text">언팔로우</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onClose} className="f-close-button">X</button>
    </div>
  );
}

FollowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['followers', 'following']).isRequired,
  userList: PropTypes.array.isRequired,
};

export default FollowModal;