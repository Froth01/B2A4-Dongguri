import './css/StoryToday.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import StoryTodayWord from "../../Components/StoryBook/StoryToday/StoryTodayWord"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import { useSelector } from 'react-redux'
import { selectPathHistory } from "../../slices/pathHistorySlice"

function StoryToday() {
  const pathHistory = useSelector(selectPathHistory);

  return (
    <div className="page-container">
      <Guide page="storyToday"/>
      <StoryTodayWord />
      <div className='today-nextbtn'>
        <NextBtn to='/storybook/storyimg' />
      </div>

      <ul>
          <h2>pathHistory</h2>
          {pathHistory.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>
    </div>
  )
}

export default StoryToday