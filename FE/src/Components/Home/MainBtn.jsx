import PropTypes from 'prop-types';
import './css/MainBtn.css'

function MainBtn({imgUrl}) {
  return (
    <>
      <img src={imgUrl} alt="MainBtn" />
    </>
  )
}

MainBtn.propTypes = {
  imgUrl: PropTypes.string.isRequired,
}
export default MainBtn