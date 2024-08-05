import { useState } from 'react';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryEnd.css";
import ReplayBtn from '../../Components/StoryBook/Common/ReplayBtn';

function StoryEnd() {
  const [isUpload, setIsUpload] = useState(false);

  const sampleCard = {
    content: "예시 컨텐츠",
    keywords: ["tag1", "tag2", "tag3"],
    transformImgUrl: "/path/to/transformed/image.jpg",
    originalImgUrl: "/path/to/original/image.jpg"
  };

  return (
    <div className='page-container end-wrapper'>
      <div className='end-left'>
        <Card card={sampleCard} showMic={false} />
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
