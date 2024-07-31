import './css/StoryFree.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"

function StoryFree() {
  return (
    <div className="storyfree">
      <Guide page='storyFree' />
      <NextBtn to='storygenre' />
    </div>
  )
}

export default StoryFree