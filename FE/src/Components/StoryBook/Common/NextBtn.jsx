import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NextBtn = ({ to }) => {
  return (
    <Link to={ to }>
      <img src="/img/storybook/common/NextBtn.png" alt="다음 버튼" />
    </Link>
  )
}

NextBtn.propTypes = {
  to: PropTypes.string.isRequired,
};

export default NextBtn;