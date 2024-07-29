import Guide from "../../Components/StoryBook/Common/Guide"
// import StoryImgSelectBtn from '../../Components/StoryBook/StoryImg/StoryImgSelectBtn'
import CircleBtn from '../../Components/StoryBook/Common/CircleBtn'

// const ImgSelect = [
//   {src:'/img/storybook/storyimg/Cute.png', alt:'귀엽게'},
//   {src:'/img/storybook/storyimg/Picture.png', alt:'사진처럼'},
// ]

function StoryImgSelect() {
  return (
    <div>
      <Guide />
      {/* {ImgSelect.map((button,index) => (
        <StoryImgSelectBtn key={index} to='/storybook/storykeyword' src={button.src} alt={button.alt} />
      ))}
       */}
      <CircleBtn />
    </div>
  )
}

export default StoryImgSelect