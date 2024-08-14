// import MiniCardList from '../Common/MiniCardList'
// import SearchBar from './SearchBar'
// import './css/SNS.css'
// import { useState, useEffect } from 'react'
// import { useLocation, useNavigate  } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
// import {selectKeyword, selectResults, selectUserResults, selectNicknameResults, 
//   selectSearchType, clearSearchResults, fetchSearchResultsThunk, 
//   setKeyword,
//   setNickname,
//   selectNickname} from '../../../slices/searchSlice'
// import SearchUserList from './SearchUserList'

// function SNS() {
//   const location = useLocation();
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const [isLast, setIsLast] = useState(false)
//   const [page,setPage] = useState(0)
//   const [cardList, setCardList] = useState([])
//   const [userList, setUserList] = useState([])
  
//   const searchResults = useSelector(selectResults)
//   // setCardList(searchResults.data.content)
//   console.log('검색결과', searchResults.data)

//   const searchUserResults = useSelector(selectUserResults)
//   console.log('유저검색', [searchUserResults.data])

//   const searchNicknameResults = useSelector(selectNicknameResults)
//   console.log('닉네임 검색 결과', searchNicknameResults)

//   const searchType = useSelector(selectSearchType)
//   console.log('검색 타입', searchType)

//   const keyword = useSelector(selectKeyword);
//   const nickname = useSelector(selectNickname)

//    useEffect(() => {
//     setPage(0);  // 페이지를 0으로 설정
//     const initialLoad = async () => {
//       setLoading(true);
//       const submitForm = {
//         keyword: keyword || '',
//         page: 0  // 첫 페이지 로드
//       };
//       try {
//         const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();
//         const initialPageCards = resultNext.data.content;
//         setCardList(initialPageCards);
//         setIsLast(resultNext.data.last);
//       } catch (error) {
//         console.error("첫 페이지를 불러오지 못했습니다:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initialLoad();
//   }, [dispatch, keyword]);
  


//   const handleCardClick = (card) => {
//     // URL을 카드의 고유 ID로 업데이트합니다.
//     navigate(`/sns/${card.storybookId}`, { state: { card } });
//   };

//   const handleSearchBar = async (type) => {
//     if (type === 'storybook') {
//       await setCardList(searchResults.data.content)
//       console.log('카드리스트 갱신:',cardList)
//     } else if (type === 'nickname') {
//       await setUserList(searchNicknameResults.data.content)
//       console.log('닉네임리스트 갱신:', userList)
//     }
//   }

//   useEffect(() => {
//     const handleScroll = async () => {
//       const scrollContainer = document.querySelector('.sns');
//       console.log('스크롤 위치:', scrollContainer.scrollTop);
//       console.log('스크롤 높이:', scrollContainer.scrollHeight);
//       console.log('화면에 보이는 높이:', scrollContainer.clientHeight);
//       // console.log('스크롤이 맨 아래인가?', isScrollAtBottom);
//       console.log('현재 로딩 중인가?', loading);
//       console.log('마지막 페이지인가?', isLast);
//       console.log(scrollContainer.scrollTop + scrollContainer.clientHeight, scrollContainer.scrollHeight);
      
//       if (
//         scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
//         !loading &&
//         !isLast
//       ) {
//         console.log('엥?');
//         setLoading(true);
//         const submitForm = {
//           keyword: keyword,
//           page: page + 1
//         };

//         try {
//           const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();

//           console.log('새 페이지 데이터:', resultNext);
  
//           const nextPageCards = resultNext.data.content;
  
//           // 중복된 키를 가진 항목 필터링
//           const uniqueNextPageCards = nextPageCards.filter(
//             card => !cardList.some(existingCard => existingCard.storybookId === card.storybookId)
//           );
  
//           setCardList(prevList => [...prevList, ...uniqueNextPageCards]);
//           setIsLast(resultNext.data.last);
//           setPage(page + 1); // 페이지 증가
//           // setPage(prevPage => prevPage + 1); // 페이지 증가
//           console.log(page)
//         } catch (error) {
//           console.error("다음 페이지를 불러오지 못했습니다:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
  
//     const modalContent = document.querySelector('.sns');
//     modalContent.addEventListener('scroll', handleScroll);
//     return () => modalContent.removeEventListener('scroll', handleScroll);
//   }, [loading, page, isLast, keyword, cardList, dispatch]); // 페이지와 로딩을 의존성에 포함
  
//    // `page`와 `loading`은 의존성에서 제거
  
  
//   /*
//     모달에 url 연결
//     - home에 라우터 등록
//     - navigate로 이동할 경로 연결, sns의 경우 card에 대한 정보 넘겨줬어야해서 state 사용
//     - snsDetail : state로 정보 넘겨 받았기떄문에, props로 받는거 수정. 
//       const card = location.state?.card; 이렇게 바꿔줌
//   */

//   return (
//     <div className='sns'>
//       <SearchBar searchEvent={handleSearchBar}/>

//       { searchType === 'storybook' && 
//       searchResults.data && 
//       <div className='minicardlistdiv'>
//       <MiniCardList cardList={cardList}
//       onCardClick={handleCardClick}
//       type={'SNS'}/>
//       </div>
//       }
//       { searchType === 'nickname' && 
//       searchNicknameResults.data && 
//       <SearchUserList userList={userList} />
//       }

//     </div>
//   )
// }

// export default SNS;



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
      <SearchBar searchEvent={handleSearchBar} />

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
  )
}

export default SNS;