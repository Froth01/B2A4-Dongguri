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
    <>
      <div>
        <Card content={sampleContent} tags={sampleTags} />
      </div>
      <div>
        <Guide />
        <div>
          <ReplayBtn setIsUpload={setIsUpload} />
        </div>
      </div>
    </>
  );
}

export default StoryEnd;
