import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import MainBtn from "./MainBtn"
import './css/Main.css'
import { useEffect } from "react"
import { setTargetUser } from "../../slices/mainBtnSlice"

function Main() {
  const mainBtnList = useSelector(state => state.mainBtn.list)
  const currentUser = useSelector(state => state.auth.object)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (currentUser.userId) {
      dispatch(setTargetUser(currentUser));
    }
  },[currentUser.userId,dispatch]);
  return (
    <div className="main">
      {mainBtnList.map(([mainBtn, path], index) => (
        <Link className="mainbtn" to={path} key={index}>
          <MainBtn imgUrl={mainBtn}/>
        </Link>
      ))}
    </div>
  )
}

export default Main