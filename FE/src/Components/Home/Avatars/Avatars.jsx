import AvatarInfo from './AvatarInfo'
import AvatarList from './AvatarList'
import './css/Avatars.css'
import { useDispatch, useSelector } from 'react-redux';
import { representativeApi, selectRepresentative, setRepresentative } from '../../../slices/representativeSlice'; 
import { useEffect } from 'react';

function Avatars() {

  const dispatch = useDispatch();
  const representative = useSelector(selectRepresentative);
  
  const GetAndSetRepresentative = async () => {
        const gaveRepresentative =  await dispatch(representativeApi());
        dispatch(setRepresentative(gaveRepresentative))
    }

  useEffect(() => {
    GetAndSetRepresentative();
  }
 ,[dispatch]);

 useEffect(() => {
  console.log('결과대표동그리: ', representative);
  }, [representative]);

  return (
    <div className='avatars'>
      <AvatarInfo avatar={representative} onRepChange={GetAndSetRepresentative}/>
      <AvatarList onRepChange={GetAndSetRepresentative}/>
      {/* <AvatarRepresent /> */}
    </div>
  )
}

export default Avatars