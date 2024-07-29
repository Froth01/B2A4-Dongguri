import MiniCardList from '../Common/MiniCardList'
import MyWorld from './MyWorld'
import UserInfo from './UserInfo'
import './css/StoryWorld.css'

function StoryWorld() {
  return (
    <div className='storyworld'>
      <UserInfo />
      <div className='myworlddiv'>
        <MyWorld />
      </div>
      <div className="minicardlistdiv">
        <h3>내가 만든 카드</h3>
        <MiniCardList />
      </div>
    </div>
  )
}

export default StoryWorld