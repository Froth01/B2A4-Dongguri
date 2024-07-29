import PropTypes from 'prop-types'

const KeywordInput = ({value,onChange}) => {
  return <input type="text" value={value} onChange={onChange} />

}

KeywordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default KeywordInput