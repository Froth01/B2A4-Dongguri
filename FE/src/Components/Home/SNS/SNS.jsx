import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {selectKeyword, selectResults, selectUserResults, selectNicknameResults, 
  selectSearchType, clearSearchResults, fetchSearchResultsThunk, 
  setKeyword} from '../../../slices/searchSlice'
import SearchUserList from './SearchUserList'

function SNS() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const [page,setPage] = useState(0)
  const [cardList, setCardList] = useState([])
  const [userList, setUserList] = useState([])
  const searchResults = useSelector(selectResults)
  console.log('검색결과', searchResults.data)

  const searchUserResults = useSelector(selectUserResults)
  console.log('유저검색', [searchUserResults.data])

  const searchNicknameResults = useSelector(selectNicknameResults)
  console.log('닉네임 검색 결과', searchNicknameResults)

  const searchType = useSelector(selectSearchType)
  console.log('검색 타입', searchType)

  const keyword = useSelector(selectKeyword);


  // const initialSearch = '  '
  useEffect(() => {
    setPage(0)
  }, [])

  useEffect(() => {
    // dispatch(setKeyword(null));
    console.log('검색키워드',keyword)
    if (keyword) {
      console.log('검색키워드',keyword)
      dispatch(fetchSearchResultsThunk({ keyword,page}));
    } else {
      dispatch(setKeyword(''))
      dispatch(fetchSearchResultsThunk({ keyword, page}))
    }
  }, []);

  useEffect(() => {
    // 페이지가 변경될 때마다 상태를 초기화
    return () => {
      dispatch(clearSearchResults());
      setCardList([])
      setUserList([])
    };
  }, [location, dispatch]);

  const handleCardClick = (card) => {
    // URL을 카드의 고유 ID로 업데이트합니다.
    // navigate(`/sns/${card.storybookId}`, { state: { card } });
    navigate(`/sns/${card.storybookId}`, { state: { card } });
  };

  const handleSearchBar = async (type) => {
    if (type === 'storybook') {
      await setCardList(searchResults.data.content)
      console.log('카드리스트 갱신:',cardList)
    } else if (type === 'nickname') {
      await setUserList(searchNicknameResults.data.content)
      console.log('닉네임리스트 갱신:', userList)
    }
  }

  useEffect(() => {
    const handleScroll = async () => {
      const scrollContainer = document.querySelector('.sns');
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight &&
        !loading
      ) {
        setLoading(true);
        const submitForm = {
          keyword: keyword,
          page: page + 1
        }
        if (!isLast) {
          const resultNext = await dispatch(fetchSearchResultsThunk(submitForm)).unwrap();
          console.log('또 받아온거 맞음??',resultNext)
          const nextPageCards = searchResults.data.content
          setCardList(prevList => [...prevList, ...nextPageCards]);
          setIsLast(searchResults.data.last)
          setPage(prevPage => prevPage + 1);
          setLoading(false);
          } else {
            setLoading(false);
            alert('더이상 정보가 없습니다!')
          }
        }
      };
    const modalContent = document.querySelector('.sns');
    modalContent.addEventListener('scroll', handleScroll);
    return () => modalContent.removeEventListener('scroll', handleScroll);
  }, [loading, page]);

  /*
    모달에 url 연결
    - home에 라우터 등록
    - navigate로 이동할 경로 연결, sns의 경우 card에 대한 정보 넘겨줬어야해서 state 사용
    - snsDetail : state로 정보 넘겨 받았기떄문에, props로 받는거 수정. 
      const card = location.state?.card; 이렇게 바꿔줌
  */

  return (
    <div className='sns'>
      <SearchBar searchEvent={handleSearchBar}/>

      { searchType === 'storybook' && 
      searchResults.data && 
      <div className='minicardlistdiv'>
      <MiniCardList cardList={cardList}
      onCardClick={handleCardClick}
      type={'SNS'}/>
      </div>
      }
      { searchType === 'nickname' && 
      searchNicknameResults.data && 
      <SearchUserList userList={userList} />
      }

    </div>
  )
}

export default SNS;
