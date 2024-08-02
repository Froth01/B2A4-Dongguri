import PropTypes from 'prop-types'
import './css/KeywordInput.css'

const KeywordInput = ({value,onChange}) => {
  return (
    <div className='keywordinput'>
      <input type="text" value={value} onChange={onChange} placeholder='예)잠자리'/>
    </div>
  )

}

KeywordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default KeywordInput