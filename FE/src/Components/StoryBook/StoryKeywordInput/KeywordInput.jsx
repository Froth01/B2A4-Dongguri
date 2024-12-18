import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setKeyword, selectKeyword, selectMakeStory } from '../../../slices/makeStorySlice'
import './css/KeywordInput.css'

const KeywordInput = ({index}) => {
  const dispatch = useDispatch()
  const keywords = useSelector(selectKeyword)
  const makeStory = useSelector(selectMakeStory)

  const handleChange = (event) => {
    const newKeywords = [...keywords]
    newKeywords[index] = event.target.value
    dispatch(setKeyword(newKeywords))
    console.log('Keywords: ', newKeywords)
    console.log('리덕스 저장 내용:', makeStory)
  }
  
  return (
    <div className='keywordinput'>
      <input type="text" value={keywords[index]} onChange={handleChange} placeholder='예) 잠자리'/>
    </div>
  )

}

KeywordInput.propTypes = {
  index: PropTypes.number.isRequired,
};

export default KeywordInput