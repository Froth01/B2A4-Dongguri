import MiniCardList from '../Common/MiniCardList'
import MyWorld from './MyWorld'
import UserInfo from './UserInfo'
import './css/StoryWorld.css'
import { useSelector } from 'react-redux'

function StoryWorld() {
  const userInfo = useSelector(state => state.userInfo.object)
  
  return (
    <div className='storyworld'>
      <UserInfo userInfo={userInfo}/>
      <div className='myworlddiv'>
        <MyWorld userInfo={userInfo}/>
      </div>
      <div className="minicardlistdiv">
        <h3>내가 만든 카드</h3>
        <MiniCardList userInfo={userInfo} />
      </div>
    </div>
  )
}

export default StoryWorld