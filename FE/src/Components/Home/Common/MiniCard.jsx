import PropTypes from 'prop-types'
import './css/MiniCard.css'


function MiniCard({num}) {
  return (
    <div className='minicard'>
      <div className='minicardimg'>
        minicard,{num}
      </div>
      <h3 className='hash'>#미니카드</h3>
    </div>
  )
}

MiniCard.propTypes = {
  num: PropTypes.string.isRequired,
}

export default MiniCard