import { useRef, useEffect } from 'react';
import { useParams,useLocation,useNavigate  } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Common/Card';
import Community from './Community';
import './css/SnsDetail.css';

// function SnsDetail({ card, toggleModal }) {
function SnsDetail({ toggleModal }) {
  const modalRef = useRef(null);
  const { storybookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;
  console.log('카드',card)

  useEffect(() => {
    // storybookId가 변경될 때마다 해당 카드를 찾아서 선택할 수 있습니다.
    // 이 부분은 필요에 따라 구현하세요.
  }, [storybookId]);

  const handleCloseClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate('/sns')
      toggleModal();
    }
  };

  return (
    <div className="sns-detail">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={handleCloseClick}>
          <div className="modal-content" ref={modalRef}>
            {/* <button className="close-button" onClick={toggleModal}>✕</button> */}
            <button className="close-button" onClick={() => navigate('/sns')}>✕</button>
            <div className="modal-body">
              <Card 
                card={card}
                handleCardClick={() => {}}
              />
              <Community
                card={card}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SnsDetail.propTypes = {
  card: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
};

export default SnsDetail;
