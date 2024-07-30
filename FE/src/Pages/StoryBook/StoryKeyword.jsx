import { useState } from "react"
import './css/StoryKeyword.css'
import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput"
import StoryImgBtn from "../../Components/StoryBook/StoryImg/StoryImgBtn"

const StoryKeyword = () => {
  const [keywords, setKeywords] = useState(['','','',''])

  const handleChange = (index, event) => {
    const newKeywords = [...keywords];
    newKeywords[index] = event.target.value;
    setKeywords(newKeywords);
  };

  return (
    <div className="storykeyword">
      <Guide />
      <div className="content-wrapper">
        <StoryImgBtn />
        <div className="keyword-input-grid">
          {keywords.map((keyword, index) => (
            <StoryKeywordInput key={index} value={keyword} onChange={(event) => handleChange(index, event)} />
          ))}
        </div>
      </div>
      <NextBtn to='/storybook/storyend' />
    </div>
  )
}



export default StoryKeyword