import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"

function StoryFree() {
  return (
    <div>자유주제 페이지입니다
      <Guide />
      <NextBtn to='storygenre' />
    </div>
  )
}

export default StoryFree