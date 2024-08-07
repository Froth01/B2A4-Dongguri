import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/NextBtn.css'

const NextBtn = ({ to, disabled = false}) => {

  return (
    <div className={`nextbtn ${disabled ? 'disabled':''}`}>
      <Link to={ disabled ? '#' : to } className='next-link'>
        <img src="/img/storybook/common/NextBtn.png" alt="다음 버튼" className='next-img' />
      </Link>
    </div>
  )
}

NextBtn.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};



export default NextBtn;