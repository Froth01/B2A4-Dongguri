import { useSelector } from "react-redux"
import MainBtn from "./MainBtn"
import './css/StoryWorld.css'

function StoryWorld() {
  const mainBtnList = useSelector(state => state.mainBtn.list)

  return (
    <div className="storyworld">
      {mainBtnList.map((mainBtn, index) => (
        <MainBtn key={index} imgUrl={mainBtn}/>
      ))}
    </div>
  )
}

export default StoryWorld