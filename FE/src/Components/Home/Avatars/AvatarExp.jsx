import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepresentativeThunk, selectRepresentative } from '../../../slices/representativeSlice'; 
import './css/AvatarExp.css'

function AvatarExp() {
  const dispatch = useDispatch();
  // const representative = useSelector(selectRepresentative);
  const representativeData = useSelector(selectRepresentative);
  const representative = representativeData.data

  useEffect(() => {
    dispatch(fetchRepresentativeThunk());
  }, [dispatch]);
  
  const levelMap = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,

  }

  const done = representative.exp
 
  return (
    <div className="avatarexp">
      <div className="avatarlv">
      {representative.name} : {levelMap[representative.avatarLevel]}
      </div>
      <div className="expdetail">
        {[...Array(parseInt(done)).keys()].map((num) => (
          <div key={`${num}-open`} className="book">
            <img src="/img/avatars/bookopen.png" alt="exp1" />
          </div>
        ))}
        {[...Array(parseInt(10-done)).keys()].map((num) => (
          <div key={`${num}-close`} className="book">
            <img src="/img/avatars/bookclose.png" alt="exp0" />
          </div>
        ))}
      </div>
      <h3>동화를 {10-done}권 더 만들면 동그리가 자라나요!</h3>
    </div>
  )
}

export default AvatarExp