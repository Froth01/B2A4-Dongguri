import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { selectResults } from '../../../slices/searchSlice'
import { selectUserId } from '../../../slices/searchUserSlice'
import { useSelector } from 'react-redux'

function SNS() {
  const searchResults = useSelector(selectResults)
  console.log('검색결과',searchResults)

  const searchUser = useSelector(selectUserId)
  console.log('유저검색',searchUser)

  return (
    <div className='sns'>
      <SearchBar />
      <MiniCardList cardList={searchResults.data} />
    </div>
  );
}

export default SNS;
