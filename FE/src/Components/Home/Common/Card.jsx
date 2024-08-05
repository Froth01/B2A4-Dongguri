import { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayModal from '../../../Components/StoryBook/Common/AudioPlayModal'; // AudioPlayModal 임포트
import './css/Card.css';

const Card = ({ card, showMic = true }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  if (!card || !card.keywords || !Array.isArray(card.keywords) || card.keywords.length === 0) {
    return <div>No tags available</div>;
  }

  const toggleImage = () => {
    setShowOriginal(!showOriginal);
  };

  const handleListenRecording = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="card-container">
      <img
        src={showOriginal ? card.originalImgUrl : card.transformImgUrl}
        alt={showOriginal ? 'Original image' : 'Transformed image'}
        className="card-image"
        onClick={toggleImage}
      />
      <div className="card-story">
        <p className="card-storyline">{card.content}</p>
        <div className="card-tag-mic-container">
          <div className="tags-container">
            <div className="tags">
              {card.keywords.map((keyword, index) => (
                <h3 key={index} className='hash'>#{keyword}</h3>
              ))}
            </div>
          </div>
          {showMic && (
            <div className="mic-container">
              <img
                src="/img/sns/mic.png"
                alt="녹음듣기"
                className="card-record-listen"
                onClick={handleListenRecording}
              />
            </div>
          )}
        </div>
      </div>
      <AudioPlayModal 
        audioSrc={card.voiceRecord} // 음원 URL 전달
        isOpen={isModalOpen} // 모달 열림 상태
        onClose={closeModal} // 모달 닫기 함수 전달
      />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformImgUrl: PropTypes.string.isRequired,
    originalImgUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    voiceRecord: PropTypes.string,
  }),
  showMic: PropTypes.bool
};

export default Card;
