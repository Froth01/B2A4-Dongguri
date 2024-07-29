import Guide from "../../Components/StoryBook/Common/Guide"
import NextBtn from "../../Components/StoryBook/Common/NextBtn"

function StoryImg() {
  return (
    <div>
      <Guide />
      <img src="/img/storybook/storyimg/StoryImg.png" alt="이미지 업로드" />
      <NextBtn to='storyimgselect' />
    </div>
  )
}

export default StoryImg