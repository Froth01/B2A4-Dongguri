import Guide from "../../Components/StoryBook/Common/Guide"
import StoryGenreBtn from '../../Components/StoryBook/StoryGenreBtn/StoryGenreBtn'

const GenreBtn = [
  {src: "/img/storybook/storygenre/Pleasure.png", alt:"기쁨 버튼"},
  {src: "/img/storybook/storygenre/Happy.png", alt:"행복 버튼"},
  {src: "/img/storybook/storygenre/Sad.png", alt:"슬픔 버튼"},
  {src: "/img/storybook/storygenre/Joy.png", alt:"즐거움 버튼"},
]

const StoryGenre = () => {
  return (
    <div>
      <Guide />

      {GenreBtn.map((button,index) => (
        <StoryGenreBtn key={index} to='/storybook/storyimg' src={button.src} alt={button.alt} />
      ))}
    </div>
  )
}

export default StoryGenre