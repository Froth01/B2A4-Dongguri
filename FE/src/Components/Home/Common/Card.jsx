import { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayModal from '../../../Components/StoryBook/Common/AudioPlayModal';
import './css/Card.css';

const Card = ({ card, showMic = true }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(card)

  if (!card || !card.keywords || !Array.isArray(card.keywords) || card.keywords.length === 0) {
    return <div>No tags available</div>;
  }

  const toggleImage = () => {
    setShowOriginal(!showOriginal);
  };

  const handleListenRecording = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card-container">
      <img
        src={showOriginal ? card.originalImageUrl : card.transformedImageUrl}
        alt={showOriginal ? 'Original image' : 'Transformed image'}
        className="card-image"
        onClick={toggleImage}
      />
      <div className="card-story">
        <p className="card-storyline">{card.content}</p>
      </div>
      <div className="card-tag-mic-container">
        <div className="tags-container">
          <div className="tags">
            {card.keywords.filter(keyword => keyword.trim() !== '').map((keyword, index) => (
              <p key={index} className='hash'>#{keyword}</p>
            ))}
          </div>
        </div>
        <div className="mic-container">
          {showMic && (
              <img
                src="/img/sns/speaker.png"
                alt="녹음듣기"
                className="card-record-listen"
                onClick={handleListenRecording}
              />
          )}
        </div>
        <AudioPlayModal 
          audioSrc={card.voiceRecording}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
      <AudioPlayModal 
        audioSrc={card.voiceRecording}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformedImageUrl: PropTypes.string.isRequired,
    originalImageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    voiceRecording: PropTypes.string,
  }),
  showMic: PropTypes.bool
};

export default Card;
