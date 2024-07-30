import PropTypes from 'prop-types'
import './css/KeywordInput.css'

const KeywordInput = ({value,onChange}) => {
  return (
    <div className='keyworldinput'>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )

}

KeywordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default KeywordInput