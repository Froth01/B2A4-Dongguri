import { Link } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { setTransformType, selectTransformType } from "../../../slices/makeStorySlice"
import { selectCircleBtnList } from "../../../slices/circleBtnSlice";
import './css/CircleBtn.css'

function CircleBtn() {
  const circleBtnList = useSelector(selectCircleBtnList);
  const selectedTransformType = useSelector(selectTransformType)
  const dispatch = useDispatch()

  const handleTransformTypeClick = (transfromType)=>{
    dispatch(setTransformType(transfromType))
    console.log('TransformType selected:', transfromType)
    console.log('Current genre in state:', selectedTransformType)
  }
  return(
    <div className="circlebtn">
    {circleBtnList.map(([src,alt,to, transfromType], index)=> (
      <Link to = { to } key={index} onClick={() => handleTransformTypeClick(transfromType)}>
        <img src={src} alt={alt} />
      </Link>
    ))}
    </div>
  )
}


export default CircleBtn