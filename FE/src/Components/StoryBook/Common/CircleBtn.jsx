import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'


function CircleBtn() {
  const circleBtnList = useSelector(state => state.circleBtn.list)

  return(
    <div>
    {circleBtnList.map(([src,alt,to], index)=> (
      <Link to = { to } key={index} >
        <img src={src} alt={alt} />
      </Link>
    ))}
    </div>
  )
}


export default CircleBtn