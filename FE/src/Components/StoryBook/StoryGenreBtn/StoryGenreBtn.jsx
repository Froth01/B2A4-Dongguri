import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const StoryGenreBtn = ({ to, src, alt }) => {
  return (
    <Link to = { to }>
      <img src={src} alt={alt} />
    </Link>
  )
}

StoryGenreBtn.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};


export default StoryGenreBtn