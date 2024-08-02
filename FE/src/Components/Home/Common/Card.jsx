import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './css/Card.css';

const Card = ({ card }) => {
  const [showOriginal, setShowOriginal] = useState(false); // 이미지 상태를 관리하는 state

  if (!card.keywords || !Array.isArray(card.keywords)) {
    return <div>No tags available</div>;
  }

  // 이미지 클릭 이벤트 핸들러
  const toggleImage = () => {
    setShowOriginal(!showOriginal); // 상태 토글
  };

  return (
    <div className="card-container">
      <img
        src={showOriginal ? card.originalImgUrl : card.transformImgUrl}
        alt={showOriginal ? 'Original image' : 'Transformed image'}
        className="card-image"
        onClick={toggleImage} // 이미지 클릭 시 이미지 전환
      />
      <div className="card-story">
        <p className="card-storyline">{card.content}</p>
        <div className="card-tag-list">
          <div className="tags">
            {card.keywords.map((keyword, index) => (
              <h3 key={index} className='hash'>#{keyword}</h3>
            ))}
          </div>
          <button className="card-record-listen">녹음듣기</button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    isTodayKeyword: PropTypes.bool.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    content: PropTypes.string.isRequired,
    originalImgUrl: PropTypes.string.isRequired,
    transformImgUrl: PropTypes.string.isRequired,
    voiceRecord: PropTypes.string.isRequired,
    isMine: PropTypes.bool.isRequired,
    createdDate: PropTypes.string.isRequired,
    modifiedDate: PropTypes.string
  }),
  handleCardClick: PropTypes.func.isRequired, // 이 프롭은 사용되지 않고 있습니다. 필요 없다면 제거 가능
};

export default Card;