
import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {
  selectKeyword, selectResults, selectUserResults, selectNicknameResults,
  selectSearchType, clearSearchResults, fetchSearchResultsThunk,
  setKeyword,
  setNickname,
  selectNickname
} from '../../../slices/searchSlice'
import SearchUserList from './SearchUserList'

function SNS() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const [page, setPage] = useState(0)
  const [cardList, setCardList] = useState([])
  const [userList, setUserList] = useState([])
  const [nicknamePage, setNicknamePage] = useState(0)
  const [isNicknameLast, setIsNicknameLast] = useState(false)

  const searchResults = useSelector(selectResults)
  const searchUserResults = useSelector(selectUserResults)
  const searchNicknameResults = useSelector(selectNicknameResults)
  const searchType = useSelector(selectSearchType)
  const keyword = useSelector(selectKeyword);
  const nickname = useSelector(selectNickname)

  useEffect(() => {
    setPage(0);
    setNicknamePage(0);
    setUserList([]);
    setCardList([]);

    const initialLoad = async () => {
      setLoading(true);
      const submitForm = {
        keyword: keyword || '',
        page: 0
      };
      try {
        const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();
        if (searchType === 'storybook') {
          const initialPageCards = resultNext.data.content;
          setCardList(initialPageCards);
          setIsLast(resultNext.data.last);
        // } else if (searchType === 'nickname') {
        //   const initialPageUsers = resultNext.data.content;
        //   setUserList(initialPageUsers);
        //   setIsNicknameLast(resultNext.data.last);
        }
      } catch (error) {
        console.error("첫 페이지를 불러오지 못했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    initialLoad();
  }, [dispatch, keyword, searchType]);

  const handleCardClick = (card) => {
    navigate(`/sns/${card.storybookId}`, { state: { card } });
  };

  const handleSearchBar = async (type) => {
    if (type === 'storybook') {
      await setCardList(searchResults.data.content)
    } else if (type === 'nickname') {
      await setUserList(searchNicknameResults.data.content)
    }
  }

  useEffect(() => {
    const handleScroll = async () => {
      const scrollContainer = document.querySelector('.sns');

      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
        !loading
      ) {
        if (searchType === 'storybook' && !isLast) {
          setLoading(true);
          const submitForm = {
            keyword: keyword,
            page: page + 1
          };
          try {
            const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();
            const nextPageCards = resultNext.data.content;
            const uniqueNextPageCards = nextPageCards.filter(
              card => !cardList.some(existingCard => existingCard.storybookId === card.storybookId)
            );
            setCardList(prevList => [...prevList, ...uniqueNextPageCards]);
            setIsLast(resultNext.data.last);
            setPage(page + 1);
          } catch (error) {
            console.error("다음 페이지를 불러오지 못했습니다:", error);
          } finally {
            setLoading(false);
          }
          // //////////////////////////////////////////////////////
        } else if (searchType === 'nickname' && !isNicknameLast) {
          console.log('닉네임',page, nickname)
          setLoading(true);
          const submitForm = {
            keyword: nickname,
            page: nicknamePage + 1
          };
          try {
            const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();
            const nextPageUsers = resultNext.data.content;
            const uniqueNextPageUsers = nextPageUsers.filter(
              user => !userList.some(existingUser => existingUser.id === user.id)
            );
            setUserList(prevList => [...prevList, ...uniqueNextPageUsers]);
            setIsNicknameLast(resultNext.data.last);
            setNicknamePage(nicknamePage + 1);
          } catch (error) {
            console.error("다음 닉네임 페이지를 불러오지 못했습니다:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    const modalContent = document.querySelector('.sns');
    modalContent.addEventListener('scroll', handleScroll);
    return () => modalContent.removeEventListener('scroll', handleScroll);
  }, [loading, page, nicknamePage, isLast, isNicknameLast, searchType, keyword, nickname, cardList, userList, dispatch]);

  return (
    <div className='sns'>
      <SearchBar searchEvent={handleSearchBar} className='searchbar'/>

      <div className='searchresult-box'>
        {searchType === 'storybook' && searchResults.data &&
          <div className='minicardlistdiv'>
            <MiniCardList cardList={cardList}
              onCardClick={handleCardClick}
              type={'SNS'} />
          </div>
        }
        {searchType === 'nickname' && searchNicknameResults.data &&
          <SearchUserList userList={userList} />
        }
      </div>
    </div>
  )
}

export default SNS;