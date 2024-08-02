import {useState} from 'react'
import './css/StoryImg.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryImgBtn from "../../Components/StoryBook/StoryImg/StoryImgBtn"

function StoryImg() {
  const [isUpload, setIsUpload] = useState(false)

  return (
    <div className='page-container'> 
      <Guide page="storyImg"/>
      <div className='img-wrapper'>
        <div className='img-upload'>
          <StoryImgBtn setIsUpload={setIsUpload}/>
        </div>
        <div className='img-nextbtn'>
            <NextBtn to='storyimgselect' disabled={!isUpload} />
          </div>
      </div>
    </div>
  )
}

export default StoryImg