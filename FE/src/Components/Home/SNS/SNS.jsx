import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'
import { selectResults } from '../../../slices/searchSlice'
import { useSelector } from 'react-redux'

function SNS() {
  const searchResults = useSelector(selectResults)
  console.log('검색결과',searchResults)
  return (
    <div className='sns'>
      <SearchBar />
      <MiniCardList cardList={searchResults.data} />
    </div>
  );
}

export default SNS;
