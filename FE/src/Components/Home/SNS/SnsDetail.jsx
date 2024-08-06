import { useRef } from 'react';
import PropTypes from 'prop-types';
import Card from '../Common/Card';
import Community from './Community';
import './css/SnsDetail.css';

function SnsDetail({ card, toggleModal }) {
  const modalRef = useRef(null);

  const handleCloseClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      toggleModal();
    }
  };

  return (
    <div className="sns-detail">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={handleCloseClick}>
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={toggleModal}>✕</button>
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
