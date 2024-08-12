import { useSelector, useDispatch } from 'react-redux'
import './css/FollowBtn.css'
import { AddFollow, DeleteFollow } from '../../../slices/followSlice';
import { useEffect, useState } from 'react';
import { setUserObject } from '../../../slices/userInfoSlice';

function FollowBtn() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.object)
  const currentUser = useSelector(state => state.auth.object)
  const [followId, setFollowId] = useState(userInfo.followId)
  useEffect(() => {

  },[userInfo])

  const handleFollowClick = async() => {
    if (userInfo.isFollow) {
      try {
        await dispatch(DeleteFollow())
      } catch {
        error => {throw error;};
      }
      console.log('팔로우 취소 요청 보냄');
    } else {
      try {
        const followUserInfo = await dispatch(AddFollow(userInfo.userId)).unwrap();
        dispatch(setUserObject(followUserInfo))
      } catch {
        error => {throw error;};
      }
      console.log('팔로우 요청 보냄');
    }
  }

  return (
    <div className='followbtn'>
      <button onClick={handleFollowClick}>
        {userInfo.isFollow ? '팔로우 중' : '팔로우하기'}
      </button>
    </div>
  )
}

export default FollowBtn
