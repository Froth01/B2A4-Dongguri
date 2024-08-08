import { useState } from 'react';
import './css/Follows.css';
import FollowModal from './FollowModal';
import { fetchGetUserList } from '../../../Api/api';
import { useSelector } from 'react-redux';

function Follows() {
  const currentUser = useSelector(state => state.auth.object)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('followers');
  const [userList, setUserList ] = useState([])
  const openModal = async(type) => {
    setModalType(type);
    const users = await getUsers(currentUser.userId, modalType);
    setUserList(users)
    setModalOpen(true);
  };

  //비동기 팔로잉 목록 조회
  const getUsers = async(userId, type) => {
    try {
      // const gaveUsers = await fetchGetUserList(userId, type).unwrap();
      const gaveUsers = await fetchGetUserList(userId, type).unwrap();
      if (type === 'following') {
        return gaveUsers.followings;
      } else if (type === 'followers') {
        return gaveUsers.followers;
      } else {
        return [];
      }
    } catch { 
      error => { throw error; }
    }
  }

  const dummyUsers = [
    { userId: 2, name: "User 2", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { userId: 3, name: "User 3", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { userId: 4, name: "User 4", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { userId: 5, name: "User 5", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { userId: 6, name: "User 6", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { userId: 7, name: "User 7", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { userId: 8, name: "User 8", profileImg: "https://via.placeholder.com/50", isFollowing: false },
    { userId: 9, name: "User 9", profileImg: "https://via.placeholder.com/50", isFollowing: true },
    { userId: 10, name: "User 10", profileImg: "https://via.placeholder.com/50", isFollowing: false },
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
          users={userList}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}
export default Follows;