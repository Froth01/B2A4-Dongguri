import PropTypes from 'prop-types';
import './css/MainBtn.css'

function MainBtn({imgUrl}) {
  return (
    <div className='mainbtn'>
      <img src={imgUrl} alt="MainBtn" />
    </div>
  )
}

MainBtn.propTypes = {
  imgUrl: PropTypes.string.isRequired,
}
export default MainBtn