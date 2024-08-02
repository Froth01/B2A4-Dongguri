import PropTypes from 'prop-types';
import './css/MiniCard.css';

function MiniCard({ num, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(num);
  };

  return (
    <div className='minicard' onClick={handleClick}>
      <div className='minicardimg'>
        minicard, {num}
      </div>
      <h3 className='hash'>#미니카드</h3>
    </div>
  );
}

MiniCard.propTypes = {
  num: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MiniCard;
