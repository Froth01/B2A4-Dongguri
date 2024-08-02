import './css/StoryToday.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import StoryTodayWord from "../../Components/StoryBook/StoryToday/StoryTodayWord"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"

function StoryToday() {
  return (
    <div className="page-container">
      <Guide page="storyToday"/>
      <StoryTodayWord />
      <div className='today-nextbtn'>
        <NextBtn to='/storybook/storyimg' />
      </div>
    </div>
  )
}

export default StoryToday