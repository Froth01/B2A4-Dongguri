import { useSelector, useDispatch } from 'react-redux'
import './css/FollowBtn.css'
import { AddFollow, DeleteFollow } from '../../../slices/followSlice';
import { useEffect, useState } from 'react';
import { setUserObject } from '../../../slices/userInfoSlice';
import { useLocation } from 'react-router-dom';
import fetchFollowingInfo from '../Main'

function FollowBtn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector(state => state.userInfo.object)
  const currentUser = useSelector(state => state.auth.object)
  const [hover, setHover] = useState(false)
  const followIdList = useSelector(state => state.follow.list)
  const targetFollowId = followIdList.filter(follow => follow.userId === userInfo.userId)
  
  useEffect(() => {
    
  },[userInfo, followIdList])
  console.log('리덕스저장 팔로아디', followIdList)
  console.log('팔로우버튼 유저인포',userInfo)
  console.log(targetFollowId)
  

  const handleFollowClick = async() => {
    if (userInfo.isFollow) {
      try {

        await dispatch(DeleteFollow(targetFollowId[0].followId))
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
        await dispatch(setUserObject(followUserInfo))
        fetchFollowingInfo();
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
