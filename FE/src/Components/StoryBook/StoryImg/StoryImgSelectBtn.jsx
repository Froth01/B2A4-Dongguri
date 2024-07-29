import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const StoryImgSelectBtn = ({ to, src, alt }) => {
  return (
    <Link to = { to }>
      <img src={src} alt={alt} />
    </Link>
  )
}

StoryImgSelectBtn.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};


export default StoryImgSelectBtn