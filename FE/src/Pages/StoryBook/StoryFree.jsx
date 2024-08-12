import './css/StoryFree.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
// import { useSelector } from 'react-redux'
// import { selectMakeStory } from "../../slices/makeStorySlice"
// import { selectPathHistory } from '../../slices/pathHistorySlice'

function StoryFree() {
  // const makeStory = useSelector(selectMakeStory); 
  // const pathHistory = useSelector(selectPathHistory);

  return (
    <div className="page-container storyfree">
      <Guide page='storyFree' />
      <div className='free-nextbtn'>
        <NextBtn to='storygenre' />
      </div>
{/* 
      <div className="redux-state">
        <h3>Redux State:</h3>
        <pre>{JSON.stringify(makeStory, null, 2)}</pre>
      </div> */}

      {/* <ul>
        <h2>pathHistory</h2>
        {pathHistory.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default StoryFree