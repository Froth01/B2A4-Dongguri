import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import MainBtn from "./MainBtn"
import './css/Main.css'

function Main() {
  const mainBtnList = useSelector(state => state.mainBtn.list)

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