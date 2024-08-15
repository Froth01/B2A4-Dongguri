import AvatarInfo from './AvatarInfo'
import AvatarList from './AvatarList'
import './css/Avatars.css'
import { useDispatch, useSelector } from 'react-redux';
import { representativeApi, selectRepresentative, setRepresentative } from '../../../slices/representativeSlice'; 
import { useEffect, useState } from 'react';
import refreshAvatarList from './AvatarList'
function Avatars() {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch();
  const representative = useSelector(selectRepresentative);
  
  const GetAndSetRepresentative = async () => {
        const gaveRepresentative =  await dispatch(representativeApi());
        dispatch(setRepresentative(gaveRepresentative))
        if (!refresh) {
          setRefresh(true);
        }
    }

  useEffect(() => {
    GetAndSetRepresentative();
  }
 ,[dispatch]);
  
  return (
    <div className='avatars'>
      <AvatarInfo
        avatar={representative}
        onNameChange={GetAndSetRepresentative}
        onRepChange={GetAndSetRepresentative}
        isModal={false}
        />
      <AvatarList onRepChange={GetAndSetRepresentative} refresh={refresh}/>
      {/* <AvatarRepresent /> */}
    </div>
  )
}

export default Avatars