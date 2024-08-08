import MiniCardList from '../Common/MiniCardList'
import MyWorld from './MyWorld'
import UserInfo from './UserInfo'
import './css/StoryWorld.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCardList } from '../../../slices/cardListSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

function StoryWorld() {
  const userInfo = useSelector(state => state.userInfo.object)
  const [myCardList, setMyCardList] = useState([]) 
  const dispatch = useDispatch();
  const exceptList = useSelector(state => state.cardList.list)

  useEffect(() =>{
    async function getList (userInfo) {
      const getCardForm = {
        type: 'mine',
        userId: userInfo.userId
      }
    try {
      const actionResult = await dispatch(getCardList(getCardForm))
      const gaveList = unwrapResult(actionResult)
      setMyCardList(gaveList)
    } catch {
      error => { throw error; }
      setMyCardList(exceptList)
    }}
    getList(userInfo);
  }
  ,[])

  return (
    <div className='storyworld'>
      <UserInfo userInfo={userInfo}/>
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