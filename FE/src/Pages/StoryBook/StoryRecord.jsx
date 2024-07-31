import { useState } from 'react';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryEnd.css";
import RecordBtn from '../../Components/StoryBook/Common/RecordBtn';

function StoryRecord() {
  // eslint-disable-next-line no-unused-vars
  const [isUpload, setIsUpload] = useState(false);

  const sampleContent = "예시 컨텐츠";
  const sampleTags = ["tag1", "tag2", "tag3"];

  return (
    <>
      <div>
        <Card content={sampleContent} tags={sampleTags} />
      </div>
      <div>
        <Guide />
        <div>
          <RecordBtn setIsUpload={setIsUpload} />
        </div>
      </div>
    </>
  );
}

export default StoryRecord;
