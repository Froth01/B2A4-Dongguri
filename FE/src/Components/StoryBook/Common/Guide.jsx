import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { selectDialogs } from "../../../slices/guideSlice"
import { representativeApi, selectRepresentative } from '../../../slices/representativeSlice'; 
import PropTypes from 'prop-types';
import './css/Guide.css'


const Guide = ({ page }) => {
  const dispatch = useDispatch();
  const representative = useSelector(selectRepresentative);
  const dialogs = useSelector(selectDialogs)
  console.log(representative)
  useEffect(() => {
    dispatch(representativeApi());
  }, [dispatch]);

  // data 추가함;
  const representImg = `/img/avatars/${representative.avatarType}_${representative.displayLevel}.png`


  const getDialogs = () => {
    if (
      dialogs[page] &&
      dialogs[page][representative.avatarType] &&
      dialogs[page][representative.avatarType][representative.displayLevel]
    ) {
      return dialogs[page][representative.avatarType][representative.displayLevel];
    }
    return [];
  };

  const dialogList = getDialogs();
  console.log(dialogList)
  
  return (
    <div className="guide-box">
      {page !== 'avatar' && (
        <img src={representImg} alt={`${representative.avatarType} ${representative.displayLevel}`} className="speechbubble-avatar" />
      )}
       
      {/* {dialogs[page] && dialogs[page][representative.avatarType][representative.displayLevel].map((dialog, index) => ( */}
      {dialogList.map((dialog, index) => (
        <div key={index} className="guide">
          <img src="/img/storybook/common/SpeechBubble.png" alt="" className="speechbubble-img" />
          <div className="guide-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>{dialog}</div>
        </div>
      ))}
    </div>
  )
}

Guide.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Guide