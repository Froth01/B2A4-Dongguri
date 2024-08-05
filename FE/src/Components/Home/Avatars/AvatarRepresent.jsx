import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { representativeApi, selectRepresentative } from '../../../slices/representativeSlice'; 
function AvatarRepresent() {
  const dispatch = useDispatch();
  const representative = useSelector(selectRepresentative);

  useEffect(() => {
    dispatch(representativeApi());
  }, [dispatch]);

  const representImg = `/img/avatars/${representative.avatarType}_${representative.displayLevel}.png`
  
  return (
    <div>
      <h1>{representative.avatarType} {representative.displayLevel}</h1>
      <img src={representImg} alt={`${representative.avatarType} ${representative.displayLevel}`} />
      <h1>Avatar Represent</h1>
      <p>ID: {representative.avatarId}</p>
      <p>Name: {representative.name}</p>
      <p>Experience: {representative.exp}</p>
      <p>Type: {representative.avatarType}</p>
      <p>Level: {representative.avatarLevel}</p>
      <p>Display Level: {representative.displayLevel}</p>
    </div>
  );
}

export default AvatarRepresent;
