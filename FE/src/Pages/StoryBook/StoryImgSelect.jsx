import Guide from "../../Components/StoryBook/Common/Guide"
import CircleBtn from '../../Components/StoryBook/Common/CircleBtn'
import './css/StoryImgSelect.css'

function StoryImgSelect() {
  return (
    <div className="page-container">
      <Guide page="storyImgSelect"/>
      <div className="imgselect-circle">
        <CircleBtn />
      </div>
    </div>
  )
}

export default StoryImgSelect