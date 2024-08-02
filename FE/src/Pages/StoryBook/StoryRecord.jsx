import { useState } from 'react';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryRecord.css";
import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';

function StoryRecord() {
  // eslint-disable-next-line no-unused-vars
  const [isUpload, setIsUpload] = useState(false);

  const sampleContent = "예시 컨텐츠";
  const sampleTags = ["tag1", "tag2", "tag3"];

  return (
    <div className='page-container record-wrapper'>
      <div className='record-left'>
        <Card content={sampleContent} tags={sampleTags} />
      </div>
      
      <div className='record-right'>
        <Guide page="storyRecode"/>
        <div className='record-btn'>
          <RecordBtn setIsUpload={setIsUpload} />
        </div>
      </div>
    </div>
  );
}

export default StoryRecord;
