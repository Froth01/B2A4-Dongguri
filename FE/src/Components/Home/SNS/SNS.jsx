import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { selectResults, selectUserResults, selectSearchType } from '../../../slices/searchSlice'
import { useSelector } from 'react-redux'
import SearchUserList from './SearchUserList'

function SNS() {
  const searchResults = useSelector(selectResults)
  console.log('검색결과', searchResults)

  const searchUserResults = useSelector(selectUserResults)
  console.log('유저검색', searchUserResults)

  const searchType = useSelector(selectSearchType)
  console.log('검색 타입', searchType)

  return (
    <div className='sns'>
      <SearchBar />
      {searchType === 'storybook' && searchResults.data && <MiniCardList cardList={searchResults.data} />}
      {searchType === 'user' && searchUserResults && searchUserResults.data && <SearchUserList user={searchUserResults.data} />}

    </div>
  )
}

export default SNS;
