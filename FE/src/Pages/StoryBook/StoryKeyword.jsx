import { useState } from "react"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"
import StoryKeywordInput from "../../Components/StoryBook/StoryKeywordInput/KeywordInput"

const StoryKeyword = () => {
  const [keywords, setKeywords] = useState(['','','',''])

  const handleChange = (index, event) => {
    const newKeywords = [...keywords];
    newKeywords[index] = event.target.value;
    setKeywords(newKeywords);
  };

  return (
    <div>
      {keywords.map((keywords,index) => (
        <StoryKeywordInput key={index} value={keywords} onChange={(event) => handleChange(index,event)} />
      ))}

      <NextBtn to='/storybook/storyend' />
    </div>
  )
}



export default StoryKeyword