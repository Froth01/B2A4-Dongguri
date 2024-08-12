import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/NextBtn.css'

const NextBtn = ({ to, onClick, disabled = false}) => {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };


  return (
    <div className={`nextbtn ${disabled ? 'disabled':''}`}>
      <Link to={ disabled ? '#' : to } onClick={handleClick} className='next-link'>
        {disabled ? (
          <img src="/img/storybook/common/Disable_NextBtn.png" alt="" />
        ) : (
          <img src="/img/storybook/common/NextBtn.png" alt="다음 버튼" className='next-img' />
        )}
      </Link>
    </div>
  )
}

NextBtn.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick :  PropTypes.func
};



export default NextBtn;