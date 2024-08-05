import './css/StoryFree.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"

function StoryFree() {
  return (
    <div className="page-container storyfree">
      <Guide page='storyFree' />
      <div className='free-nextbtn'>
        <NextBtn to='storygenre' />
      </div>
    </div>
  )
}

export default StoryFree