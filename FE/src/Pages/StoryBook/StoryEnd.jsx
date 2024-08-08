// import { useState } from 'react';
import { useSelector } from 'react-redux';
import Guide from "../../Components/StoryBook/Common/Guide";
import Card from "../../Components/Home/Common/Card";
import "./css/StoryEnd.css";
import ReplayBtn from '../../Components/StoryBook/Common/ReplayBtn';
import { selectStorybook } from '../../slices/storyBookSlice';
// import LoadingModal from '../../Components/StoryBook/Common/LoadingModal'; // 추가한 모달 컴포넌트
function StoryEnd() {
  // const [isUpload, setIsUpload] = useState(false);

  // const sampleCard = {
  //   genre : "HAPPY",
  //   keywords : ["나무", "숲"],
  //   content : "동화 새로운 내용..행복하게 살았답니다~~",
  //   transformImgUrl: "/path/to/transformed/image.jpg",
  //   originalImgUrl: "/path/to/original/image.jpg"
  // };
  // const { loading } = location.state || { loading: false };
  // const { loading } = location.state;

  const storybookData = useSelector(selectStorybook);
  console.log('end-data',storybookData)
  return (
    <div className='page-container end-wrapper'>
      {/* <LoadingModal isOpen={loading} /> */}
      <div className='end-left'>
        {storybookData && <Card card={storybookData} showMic={false} />}
      </div>
      <div className='end-right'>
        <Guide page="storyEnd"/>
        <div className='replay-btn'>
          <ReplayBtn />
        </div>
      </div>
    </div>
  );
}

export default StoryEnd;
