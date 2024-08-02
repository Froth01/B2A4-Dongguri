import { useSelector } from "react-redux"
import PropTypes from 'prop-types';
import './css/Guide.css'
import { selectDialogs } from "../../../slices/guideSlice"

const Guide = ({ page }) => {
  const dialogs = useSelector(selectDialogs)

  return (
    <div className="guide-box">
      {dialogs[page] && dialogs[page].map((dialog,index) => (
        <div key={index} className="guide">
            <img className="speechbubble-img" src="/img/storybook/common/SpeechBubble.png" alt="" />
          <div className="guide-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.5'  }} >{dialog}</div>
        </div>
      ))}
    </div>
  )
}

Guide.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Guide