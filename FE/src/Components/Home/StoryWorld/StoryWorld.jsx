import MiniCardList from '../Common/MiniCardList'
import MyWorld from './MyWorld'
import UserInfo from './UserInfo'
import './css/StoryWorld.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCardListByUserId } from '../../../slices/cardListSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom'
import { getUserInfo } from '../../../slices/authSlice'
import { setUserObject } from '../../../slices/userInfoSlice'

function StoryWorld() {
  const currentUser = useSelector(state => state.auth.object)
  const userInfo = useSelector(state => state.userInfo.object)
  ////
  const [loading, setLoading] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const [page,setPage] = useState(0)
  ////
  const { userId } = useParams()
  const navigate = useNavigate()

  const [myCardList, setMyCardList] = useState([]) 
  const dispatch = useDispatch();
  
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
        const cardListForm = {
          userId: parseInt(userId,10),
          page: 0
        }
        const cardListAction = await dispatch(getCardListByUserId(cardListForm));
        const gaveList = unwrapResult(cardListAction);
        setMyCardList(gaveList);
      } catch (error) {
        error => {throw error;};
      }
    }
      fetchData();
    }, []);

    console.log('받은 카드리스트 스토리월드에서 :', myCardList)



    // 
    useEffect(() => {
      const handleScroll = async () => {
        const scrollContainer = document.querySelector('.storyworld');
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
          !loading
        ) {
          setLoading(true);
          const submitForm = {
            userId: parseInt(userId, 10),
            page: page + 1
          }
          if (!isLast) {
            const resultNext = await dispatch(getCardListByUserId(submitForm)).unwrap();
            console.log('또 받아온거 맞음??',resultNext)
            const nextPageCards = resultNext
            setMyCardList(prevList => [...prevList, ...nextPageCards]);
            setIsLast(resultNext.last)
            setPage(prevPage => prevPage + 1);
            setLoading(false);
            } else {
              setLoading(false);
              alert('더이상 정보가 없습니다!')
            }
          }
        };
      const modalContent = document.querySelector('.storyworld');
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }, [loading, page, userId]);
    // 



    const handleCardClick = (card) => {
      // URL을 카드의 고유 ID로 업데이트합니다.
      // navigate(`/sns/${card.storybookId}`, { state: { card } });
      navigate(`/sns/${card.storybookId}`, { state: { card } });
    };

  return (
    <div className='storyworld'>
      <UserInfo />
      <div className='myworlddiv'>
        <MyWorld myCardList={myCardList}/>
      </div>
      <div className="minicardlistdiv">
        <h3>내가 만든 카드</h3>
        <MiniCardList cardList={myCardList} onCardClick={handleCardClick} type={'storyWorld'}/>
      </div>
    </div>
  )
}

export default StoryWorld