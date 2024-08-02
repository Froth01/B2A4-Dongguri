import { Link } from "react-router-dom";
import './css/RecordBtn.css';
// import CoolImg from '../../../../public/img/sns/cool.png';

function ReplayBtn() {
  // 두 버튼의 데이터 설정
  const buttons = [
    { to: '',src: '/img/sns/cool.png', alt: '녹음하기' },
    { to: '',src: '/img/sns/cool.png', alt: '녹음듣기' },
    { to: '',src: '/img/sns/cool.png', alt: '결과보기' },
  ];

  return (
    <div className="circlebtn-ver3 ">
      {buttons.map((button, index) => (
        <Link to={button.to} key={index} className="round-button2">
          <img src={button.src} alt={button.alt} className="record-img"/>
        </Link>
      ))}
    </div>
  );
}

export default ReplayBtn;