import { useState } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { fetchStoryBooks } from "../../../Api/api";
// import { selectPathHistory } from "../../../slices/pathHistorySlice";
// import { selectStorybook } from "../../../slices/storyBookSlice";
import './css/ReplayBtn.css';
import Replay from '/img/storybook/storyend/Replay.png'
import ReplayHover from '/img/storybook/storyend/ReplayHover.png'
import Like from '/img/storybook/storyend/Like.png'
import LikeHover from '/img/storybook/storyend/LikeHover.png'

function ReplayBtn() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const storybookData = useSelector(selectStorybook)
  // const pathHistory = useSelector(selectPathHistory)
 
  // const isTodayKeyword = pathHistory.includes('/storybook/storytoday');

  // const handleUpload = async () => {
  //   try{
  //     const data = {
  //       ...storybookData,
  //       isTodayKeyword
  //     }
  //     await fetchStoryBooks(data);
  //   }
  //   catch (error) {
  //     console.error('API 요청 실패:', error)
  //   }
  // }
  // 두 버튼의 데이터 설정
  const buttons = [
    { to: '/storybook/', defaultImg: Replay, hoverImg: ReplayHover, alt: '다시할래!' },
    { to: '/storybook/storyrecord/', defaultImg: Like, hoverImg: LikeHover, alt: '좋아!' }
    // { to: '/storybook/storyrecord/', text: '좋아!', onClick: handleUpload }
  ];

  return (
    <div className="circlebtn-ver2">
      {buttons.map((button, index) => (
        <Link 
        to={button.to} 
        key={index} 
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="round-button"
      >
        <img 
          src={hoveredIndex === index ? button.hoverImg : button.defaultImg} 
          alt={button.alt} 
          className="button-img"
        />
      </Link>
      ))}
    </div>
  );
}

export default ReplayBtn;