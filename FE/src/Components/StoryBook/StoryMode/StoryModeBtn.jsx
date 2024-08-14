import './css/StoryModeBtn.css'
import StoryToday from '/img/storybook/storymode/StoryTodyBtn.png'
import StoryTodayHover from '/img/storybook/storymode/StoryTodayBtnHover.png'
import StoryFree from '/img/storybook/storymode/StoryFreeBtn.png'
import StoryFreeHover from '/img/storybook/storymode/StoryFreeBtnHover.png'

import {useState} from 'react'
import { Link } from 'react-router-dom';

function StoryModeBtn() {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return(
    <div className='storymodebtn'>
       <Link 
        to="storytoday"
        onMouseEnter={() => setHoveredBtn('today')}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <img 
          src={hoveredBtn === 'today' ? StoryTodayHover : StoryToday} 
          alt="오늘의 주제 버튼" 
        />
      </Link>

      <Link 
        to="storyfree"
        onMouseEnter={() => setHoveredBtn('free')}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <img 
          src={hoveredBtn === 'free' ? StoryFreeHover : StoryFree} 
          alt="자유주제 버튼" 
        />
      </Link>
    </div>

  )
}

export default StoryModeBtn

