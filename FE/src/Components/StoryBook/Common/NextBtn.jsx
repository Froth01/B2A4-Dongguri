import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/NextBtn.css'

const NextBtn = ({ to, disabled = false}) => {

  return (
    <div className={`nextbtn ${disabled ? 'disabled':''}`}>
      <Link to={ disabled ? '#' : to } >
        <img src="/img/storybook/common/NextBtn.png" alt="다음 버튼" />
      </Link>
    </div>
  )
}

NextBtn.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};



export default NextBtn;