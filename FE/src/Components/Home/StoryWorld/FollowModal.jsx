import PropTypes from 'prop-types';
import './css/FollowModal.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteFollow, getFollowList } from '../../../slices/followSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function FollowModal({ isOpen, onClose, type}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [isLast, setIsLast] = useState(false)
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector(state => state.auth.object)

// 첫 비동기 팔로잉 목록 조회
  const getFollowInfo = async(type) => {
    try {
      const followForm = {
        type: type,
        page: 0
      }
      const resultFollowAction = await dispatch(getFollowList(followForm));
      const gaveList = unwrapResult(resultFollowAction);
      return gaveList
    } catch { 
      error => console.log('getuser에러 :', error)
    }
  }

  useEffect( () => {
    async function fetchFitstGet () {
    const gaveFollow = await getFollowInfo(type)
    setUsers(gaveFollow.content)
    setIsLast(gaveFollow.last)
    }
    fetchFitstGet();
  },[])

  

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
        if (!isLast) {
        const resultNext = await dispatch(getFollowList(followForm)).unwrap();
        const nextPageUsers = resultNext.content
        setUsers(prevUsers => [...prevUsers, ...nextPageUsers]);
        console.log('유저스 최신화버젼: ', users)
        setIsLast(resultNext.last)
        setPage(prevPage => prevPage + 1);
        setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };

    const modalContent = document.querySelector('.f-modal-content');
    modalContent.addEventListener('scroll', handleScroll);
    console.log('유저스 최신화버젼: ', users)
    return () => modalContent.removeEventListener('scroll', handleScroll);
  }, [currentUser.userId, type, users, page, loading]);

  const linkToUser = (user) => {
    console.log('이동합니데이', user.userId)
    navigate(`/storyworld/${user.userId}`,  { state: { user } })
  } 

  const toggleFollow = async (target) => {
    const updatedUsers = await dispatch(DeleteFollow(target.followId)).unwrap();
    setUsers(updatedUsers);
  };
  
  if (!isOpen) return null;

  return (
    <div className="f-modal-overlay" onClick={onClose}>
      <div className="f-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{type === 'follower' ? '팔로워' : '팔로우'}</h2>
        <ul className="user-list">
          {users.map(user => (
            <li key={user.userId} className="user-item" onClick={()=>linkToUser(user)}>
              <img src={user.profileImageUrl !== null ? user.profileImageUrl : '/img/home/userdefault.png'} alt={user.nickname} className="user-avatar" />
              <span className="user-name">{user.nickname}</span>
              {type === 'follower' && user.userId !== currentUser.userId && (
                <button className={`follow-button ${user.isFollow ? 'following' : ''}`} onClick={() => toggleFollow(user)}>
                  <span className="follow-text">{user.isFollow ? '팔로우 중' : '팔로우'}</span>
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
  type: PropTypes.oneOf(['follower', 'following']).isRequired,
  userList: PropTypes.array.isRequired,
};

export default FollowModal;