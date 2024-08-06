import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { representativeApi, selectRepresentative } from '../../../slices/representativeSlice'; 
import AvatarExp from './AvatarExp'
import Guide from '../../StoryBook/Common/Guide'
import './css/AvatarInfo.css'

function AvatarInfo() {
  const dispatch = useDispatch();
  const representative = useSelector(selectRepresentative);

  useEffect(() => {
    dispatch(representativeApi());
  }, [dispatch]);

  const representImg = `/img/avatars/${representative.avatarType}_${representative.displayLevel}.png`

  return (
    <div className='avatarinfo'>
      <h3>내 동그리</h3>
      <div className='infodetail'>
        <img src={representImg} alt={`${representative.avatarType} ${representative.displayLevel}`} />
        <Guide page='storyFree'/>
        <AvatarExp />
      </div>
    </div>
  )
}

export default AvatarInfo