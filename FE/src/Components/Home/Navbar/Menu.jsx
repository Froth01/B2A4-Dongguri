import PropTypes from 'prop-types';
import './css/Menu.css'

function Menu({imgUrl}) {
  return (
    <div className='menu pulse-grow'>
      <img src={imgUrl} alt="Menu" />
    </div>
  )
}

Menu.propTypes = {
  imgUrl: PropTypes.string.isRequired,
}
export default Menu