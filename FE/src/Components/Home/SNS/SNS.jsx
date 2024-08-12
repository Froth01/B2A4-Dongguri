import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { useEffect } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {selectKeyword, selectResults, selectUserResults, selectNicknameResults, 
  selectSearchType, clearSearchResults, fetchSearchResultsThunk } from '../../../slices/searchSlice'
import SearchUserList from './SearchUserList'

function SNS() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchResults = useSelector(selectResults)
  console.log('검색결과', searchResults.data)

  const searchUserResults = useSelector(selectUserResults)
  console.log('유저검색', [searchUserResults.data])

  const searchNicknameResults = useSelector(selectNicknameResults)
  console.log('닉네임 검색 결과', searchNicknameResults)

  const searchType = useSelector(selectSearchType)
  console.log('검색 타입', searchType)

  const keyword = useSelector(selectKeyword);

  const page = 0

  useEffect(() => {

  }, [searchResults])

  useEffect(() => {
    if (keyword) {
      dispatch(fetchSearchResultsThunk({ keyword,page}));
    }
  }, [dispatch, keyword,page]);

  useEffect(() => {
    // 페이지가 변경될 때마다 상태를 초기화
    return () => {
      dispatch(clearSearchResults());
    };
  }, [location, dispatch]);

  const handleCardClick = (card) => {
    // URL을 카드의 고유 ID로 업데이트합니다.
    navigate(`/sns/${card.storybookId}`, { state: { card } });
  };

  /*
    모달에 url 연결
    - home에 라우터 등록
    - navigate로 이동할 경로 연결, sns의 경우 card에 대한 정보 넘겨줬어야해서 state 사용
    - snsDetail : state로 정보 넘겨 받았기떄문에, props로 받는거 수정. 
      const card = location.state?.card; 이렇게 바꿔줌
  */

  return (
    <div className='sns'>
      <SearchBar />

      { searchType === 'storybook' && 
      searchResults.data && 
      <MiniCardList cardList={searchResults.data.content}  
      onCardClick={handleCardClick}/>
      }

      {/* {searchType === 'user' && searchUserResults && searchUserResults.data && <SearchUserList user={searchUserResults.data} />} */}
      { searchType === 'user' && 
      searchUserResults.data && 
      <SearchUserList userList={[searchUserResults.data]} />
      }
      
      { searchType === 'nickname' && 
      searchNicknameResults.data && 
      <SearchUserList userList={searchNicknameResults.data.content} />
      }

    </div>
  )
}

export default SNS;
