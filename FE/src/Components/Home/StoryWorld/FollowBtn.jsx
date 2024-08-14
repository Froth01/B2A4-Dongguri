import { useSelector, useDispatch } from 'react-redux'
import './css/FollowBtn.css'
import { AddFollow, DeleteFollow } from '../../../slices/followSlice';
import { useEffect, useState } from 'react';
import { setUserObject } from '../../../slices/userInfoSlice';
import { useLocation } from 'react-router-dom';

function FollowBtn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector(state => state.userInfo.object)
  const currentUser = useSelector(state => state.auth.object)
  const [hover, setHover] = useState(false)
  const [followId, setFollowId] = useState(userInfo.followId)
  const user = location.state?.user;

  console.log('팔로우버튼 state로 온 유져', user)

  useEffect(() => {

  },[userInfo])

  console.log('팔로우버튼 유저인포',userInfo)


  const handleFollowClick = async() => {
    if (userInfo.isFollow) {
      try {

        await dispatch(DeleteFollow(user.followId))
        if(userInfo.isFollow) {
          dispatch(setUserObject({...userInfo, isFollow: false}))
        }
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
    <div className='followbtndiv'>
      <button className={`${userInfo.isFollow ? 'followed followbtn' : 'followbtn'}`}
        onClick={handleFollowClick}
        onMouseEnter={() => setHover(true)}  // 마우스가 버튼 위에 있을 때
        onMouseLeave={() => setHover(false)}
        >
          {userInfo.isFollow ? hover ? '팔로우 취소' : '팔로우 중' : '팔로우하기'}
      </button>
    </div>
  )
}

export default FollowBtn
