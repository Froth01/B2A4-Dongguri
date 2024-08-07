import MiniCardList from '../Common/MiniCardList'
import MyWorld from './MyWorld'
import UserInfo from './UserInfo'
import './css/StoryWorld.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCardList } from '../../../slices/cardListSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../../../slices/authSlice'
import { setUserObject } from '../../../slices/userInfoSlice'

function StoryWorld() {
  const currentUser = useSelector(state => state.auth.object)
  const userInfo = useSelector(state => state.userInfo.object)
  const { userId } = useParams()

  const [myCardList, setMyCardList] = useState([]) 
  const dispatch = useDispatch();
  const exceptList = useSelector(state => state.cardList.list)
  
  useEffect(() => {
    async function fetchData() {
      // 유저 정보
      try {
        const resultAction = await dispatch(getUserInfo(userId));
        const gaveUser = unwrapResult(resultAction);
        dispatch(setUserObject(gaveUser));
        console.log('StoryWorld > targetUser : ', gaveUser)
      } catch (error) {
        error => {throw error;};
        console.log(error)
      }

      // 카드 리스트
      try {
        const getCardForm = {
          type: 'mine',
          userId: userId // 여기서 userId를 사용하여 카드 리스트를 가져옵니다.
        };
        const cardListAction = await dispatch(getCardList(getCardForm));
        const gaveList = unwrapResult(cardListAction);
        setMyCardList(gaveList);
        console.log('StoryWorld > MyCardList = ', gaveList)
      } catch (error) {
        error => {throw error;};
        setMyCardList(exceptList);
        console.log('StoryWorld error > MyCardList = ', gaveList)
      }
    }
      fetchData();
    }, []);
  return (
    <div className='storyworld'>
      <UserInfo />
      <div className='myworlddiv'>
        <MyWorld userInfo={userInfo} myCardList={myCardList}/>
      </div>
      <div className="minicardlistdiv">
        <h3>내가 만든 카드</h3>
        <MiniCardList cardList={myCardList} />
      </div>
    </div>
  )
}

export default StoryWorld