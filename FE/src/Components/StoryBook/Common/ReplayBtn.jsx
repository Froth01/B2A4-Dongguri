import { Link } from "react-router-dom";
import './css/ReplayBtn.css';

function ReplayBtn() {
  // 두 버튼의 데이터 설정
  const buttons = [
    { to: '/storybook/', text: '다시할래!' },
    { to: '/storybook/storyrecord/', text: '좋아!' }
  ];

  return (
    <div className="circlebtn">
      {buttons.map((button, index) => (
        <Link to={button.to} key={index} className="round-button">
          {button.text}
        </Link>
      ))}
    </div>
  );
}

export default ReplayBtn;