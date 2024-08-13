import StoryModeBtn from "../../Components/StoryBook/StoryMode/StoryModeBtn"
import { useSelector } from 'react-redux'
import { selectMakeStory } from "../../slices/makeStorySlice"
import { selectPathHistory } from "../../slices/pathHistorySlice"

// import './css/StoryMode.css'

function StoryMode() {
  // const makeStory = useSelector(selectMakeStory); 
  // const pathHistory = useSelector(selectPathHistory);

  return (
    <div className="page-container">
      <StoryModeBtn />
      {/* <div className="redux-state">
        <h3>Redux State:</h3>
        <pre>{JSON.stringify(makeStory, null, 2)}</pre>
      </div>

      <ul>
         <h2>pathHistory</h2>
          {pathHistory.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul> */}

    </div>
  )
}

export default StoryMode