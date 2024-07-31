import { Link } from "react-router-dom";
import './css/ReplayBtn.css';
import CoolImg from '../../../../public/img/sns/cool.png';

function ReplayBtn() {
  // 두 버튼의 데이터 설정
  const buttons = [
    { to: '',src: {CoolImg}, alt: '녹음하기' },
    { to: '',src: {CoolImg}, alt: '녹음듣기' },
    { to: '',src: {CoolImg}, alt: '결과보기' },
  ];

  return (
    <div className="circlebtn">
      {buttons.map((button, index) => (
        <Link to={button.to} key={index} className="round-button">
          <img src={button.src} alt={button.alt} />
        </Link>
      ))}
    </div>
  );
}

export default ReplayBtn;