import { useState } from 'react';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryEnd.css";
import ReplayBtn from '../../Components/StoryBook/Common/ReplayBtn';

function StoryEnd() {
  // eslint-disable-next-line no-unused-vars
  const [isUpload, setIsUpload] = useState(false);

  const sampleContent = "예시 컨텐츠";
  const sampleTags = ["tag1", "tag2", "tag3"];

  return (
    <div className='page-container end-wrapper'>
      <div className='end-left'>
        <Card content={sampleContent} tags={sampleTags} />
      </div>
      <div className='end-right'>
        <Guide page="storyEnd"/>
        <div className='replay-btn'>
          <ReplayBtn setIsUpload={setIsUpload} />
        </div>
      </div>
    </div>
  );
}

export default StoryEnd;
