import { Link } from 'react-router-dom';

function StoryModeBtn() {
  return(
    <div>
      <Link to="storyfree">
        <img src={"/img/storybook/storymode/StoryFreeBtn.png"} alt="자유주제 버튼" />
      </Link>

      <Link to="storytoday">
        <img src={"/img/storybook/storymode/StoryTodyBtn.png"} alt="오늘의 주제 버튼" />
      </Link>

    </div>
  )
}

export default StoryModeBtn

