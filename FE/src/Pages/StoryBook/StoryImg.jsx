import {useState} from 'react'
import './css/StoryImg.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryImgBtn from "../../Components/StoryBook/StoryImg/StoryImgBtn"

function StoryImg() {
  const [isUpload, setIsUpload] = useState(false)

  return (
    <div className='storyimg'> 
      <div className='guide'>
        <Guide page="storyImg"/>
      </div>
      <div className='content-wrapper'>
        <StoryImgBtn setIsUpload={setIsUpload}/>
        <div className='nextbtn'>
          <NextBtn to='storyimgselect' disabled={!isUpload} />
        </div>
      </div>
    </div>
  )
}

export default StoryImg