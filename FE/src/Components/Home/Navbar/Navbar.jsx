import './css/Navbar.css'
import Menu from './Menu'
import UserImg from './UserImg'
import { useSelector } from 'react-redux'

function Navbar() {
  const imgUrlList = useSelector(state => state.imgUrl.list)
  
  return (
    <div className='navbar'>
      <div>
        <img src="/img/navbar/logocut.png" alt="Logo" />
      </div>
      <div className='menus'>
        <Menu imgUrl={imgUrlList[0]}/>
        <Menu imgUrl={imgUrlList[1]}/>
        <Menu imgUrl={imgUrlList[2]}/>
        <Menu imgUrl={imgUrlList[3]}/>
      </div>
      <div>
        <UserImg />
      </div>
    </div>
  )
}

export default Navbar