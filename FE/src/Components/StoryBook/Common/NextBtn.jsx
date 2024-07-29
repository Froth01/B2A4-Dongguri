import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/NextBtn.css'

const NextBtn = ({ to }) => {
  return (
    <div className='nextbtn'>
      <Link to={ to }>
        <img src="/img/storybook/common/NextBtn.png" alt="다음 버튼" />
      </Link>
    </div>
  )
}

NextBtn.propTypes = {
  to: PropTypes.string.isRequired,
};

export default NextBtn;