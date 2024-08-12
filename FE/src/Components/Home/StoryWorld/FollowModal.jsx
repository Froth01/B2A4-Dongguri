import PropTypes from 'prop-types';
import './css/FollowModal.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowList } from '../../../slices/followSlice';

function FollowModal({ isOpen, onClose, type, userList }) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(userList)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector(state => state.auth.object)

  useEffect(() => {
    const handleScroll = async () => {
      const scrollContainer = document.querySelector('.f-modal-content');
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
        !loading
      ) {
        setLoading(true);
        const followForm = {
          type: type,
          page: page + 1
        }
        const nextPageUsers = await dispatch(GetFollowList(followForm)).unwrap();
        setUsers(prevUsers => [...prevUsers, ...nextPageUsers[type]]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      }
    };

    const modalContent = document.querySelector('.f-modal-content');
    modalContent.addEventListener('scroll', handleScroll);
    return () => modalContent.removeEventListener('scroll', handleScroll);
  }, [currentUser.userId, type, page, loading]);

  const toggleFollow = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.userId === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };
  
  if (!isOpen) return null;

  return (
    <div className="f-modal-overlay" onClick={onClose}>
      <div className="f-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{type === 'follower' ? '팔로워' : '팔로우'}</h2>
        <ul className="user-list">
          {/* {users.map(user => (
            <li key={user.userId} className="user-item">
              <img src={user.profileImg} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name}</span>
              {type === 'follower' && user.userId !== currentUser.userId && (
                <button className={`follow-button ${user.isFollowing ? 'following' : ''}`} onClick={() => toggleFollow(user.userId)}>
                  <span className="follow-text">{user.isFollowing ? '팔로우 중' : '팔로우'}</span>
                  <span className="unfollow-text">언팔로우</span>
                </button>
              )}
            </li>
          ))} */}
        </ul>
      </div>
      <button onClick={onClose} className="f-close-button">X</button>
    </div>
  );
}

FollowModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['follower', 'following']).isRequired,
  userList: PropTypes.array.isRequired,
};

export default FollowModal;