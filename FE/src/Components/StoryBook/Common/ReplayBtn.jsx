import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { fetchStoryBooks } from "../../../Api/api";
// import { selectPathHistory } from "../../../slices/pathHistorySlice";
// import { selectStorybook } from "../../../slices/storyBookSlice";
import './css/ReplayBtn.css';

function ReplayBtn() {
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
    { to: '/storybook/', text: '다시할래!' },
    { to: '/storybook/storyrecord/', text: '좋아!'}
    // { to: '/storybook/storyrecord/', text: '좋아!', onClick: handleUpload }
  ];

  return (
    <div className="circlebtn-ver2">
      {buttons.map((button, index) => (
        <Link to={button.to} key={index} onClick={button.onClick} className="round-button" >
          {button.text}
        </Link>
      ))}
    </div>
  );
}

export default ReplayBtn;