import MiniCardList from '../Common/MiniCardList'
import SearchBar from './SearchBar'
import './css/SNS.css'

function SNS() {
  return (
    <div className='sns'>
      <SearchBar />
      <MiniCardList />
    </div>
  )
}

export default SNS