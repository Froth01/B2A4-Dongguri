import PropTypes from 'prop-types';
import './css/MiniCard.css';

function MiniCard({ card, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(card);
  };

  return (
    <div className='minicard' onClick={handleClick}>
      <div className='minicardimg'>
      <img src={card.transformImgUrl} alt={'minicard image'} />
      </div>
      {card.keywords.map((keyword, index) => (
        <h3 key={index} className='hash'>#{keyword}</h3>
      ))}
    </div>
  );
}

MiniCard.propTypes = {
  card: PropTypes.shape({
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformImgUrl: PropTypes.string.isRequired,
  }),
  handleCardClick: PropTypes.func.isRequired,
};

export default MiniCard;