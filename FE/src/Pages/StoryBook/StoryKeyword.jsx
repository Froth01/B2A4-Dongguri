// import { useState } from "react"
import './css/StoryKeyword.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput"
import StoryImgBtn from "../../Components/StoryBook/StoryImg/StoryImgBtn"
import { useSelector } from "react-redux"
import { selectKeyword } from "../../slices/makeStorySlice"

const StoryKeyword = () => {
  const keywords = useSelector(selectKeyword)

  return (
    <div className="page-container">
      <Guide page="storyKeyword"/>

      <div className="keyword-wrapper">
        <StoryImgBtn />
        <div className="keyword-right">
          <div className="keyword-input-grid">
            {keywords.map((keyword, index) => (
              <StoryKeywordInput key={index} index={index} />
            ))}
          </div>
          <div className="keyword-nextbtn">
            <NextBtn to='/storybook/storyend' />
          </div>
        </div>
      </div>
      
    </div>
  )
}



export default StoryKeyword