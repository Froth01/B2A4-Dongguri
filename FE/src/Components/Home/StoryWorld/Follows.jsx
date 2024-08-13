import { useState, useEffect } from 'react';
import './css/Follows.css';
import FollowModal from './FollowModal';
import { getFollowList } from '../../../slices/followSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

function Follows() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.object)
  const userInfo = useSelector(state => state.userInfo.object)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('follower');
  const [userList, setUserList ] = useState([])
  const [followCounts, setFollowCounts] = useState({following: 0, follower: 0})

  //팔로우 수 가져오기
  useEffect(() => {
      setFollowCounts({following: userInfo.followingCount, follower: userInfo.followerCount});
      console.log('팔로우 수 :', followCounts)
    }, [userList]);

  const openModal = async(type) => {
    setModalType(type);
    try {
    const users = await getUsers(type);
    console.log('api 받아온 팔로우 유저리스트', users)
    setUserList(users)
    setModalOpen(true);
    } catch {
      error => console.log(error)
    }
  };

  
  //비동기 팔로잉 목록 조회
  const getUsers = async(type) => {
    try {
      const followForm = {
        type: type,
        page: 0
      }
      console.log('실행은하냐?',followForm)
      const resultFollowAction = await dispatch(getFollowList(followForm));
      console.log('하긴했냐고', resultFollowAction)
      const gaveList = unwrapResult(resultFollowAction);
      console.log('getusers의 결과 : ', gaveList)
      return gaveList
    } catch { 
      error => console.log('getuser에러 :', error)
    }
  }
  return (
    <div className='follows'>
      <div className='followinfo' onClick={() => openModal('following')}>
        <div className="follownum">
        {followCounts.following}
        </div>
        <h2>팔로우</h2>
      </div>
      <div className='followinfo' onClick={() => openModal('follower')}>
        <div className="follownum">
          {followCounts.follower}
        </div>
        <h2>팔로워</h2>
      </div>
      {modalOpen && (
        <FollowModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
          userList={userList}
        />
      )}
    </div>
  );
}
export default Follows;