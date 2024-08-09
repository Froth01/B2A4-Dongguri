import PropTypes from 'prop-types';
import './css/MiniCard.css';

function MiniCard({ card, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(card);
  };

  return (
    <div className='minicard' onClick={handleClick}>
      <div className='minicardimg'>
        <img src={card.transformedImageUrl} alt={'minicard image'} />
      </div>
      <div className='hash-container'>
        {card.keywords.map((keyword, index) => (
          <h3 key={index} className='hash'>#{keyword}</h3>
        ))}
      </div>
    </div>
  );
}

MiniCard.propTypes = {
  card: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MiniCard;