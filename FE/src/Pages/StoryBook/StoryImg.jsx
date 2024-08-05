import './css/StoryImg.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryImgBtn from "../../Components/StoryBook/StoryImg/StoryImgBtn"
import { useSelector } from 'react-redux'
import { selectOriginalImageUrl } from '../../slices/makeStorySlice'

function StoryImg() {
  const originalImageUrl = useSelector(selectOriginalImageUrl)

  return (
    <div className='page-container'> 
      <Guide page="storyImg"/>

      <div className='img-wrapper'>
        <div className='img-upload'>
          <StoryImgBtn />
        </div>
        <div className='img-nextbtn'>
            <NextBtn to='storyimgselect' disabled={!originalImageUrl} />
      </div>
      </div>

      
    </div>
  )
}

export default StoryImg