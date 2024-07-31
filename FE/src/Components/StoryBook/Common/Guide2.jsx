import './css/Guide.css'
import DialogBox from './Guide'
function Guide() {
  return (
    <div className="guide">
      {/* 유저가 키우는 동그리 이미지 불러오기 */}
      {/* 유저 이름 대사에 나오도록 하기 */}
      <DialogBox page="storyMode" />
      {/* <img src="/img/storybook/common/SpeechBubble.png" alt="말풍선" /> */}
    </div>
  )
}

export default Guide