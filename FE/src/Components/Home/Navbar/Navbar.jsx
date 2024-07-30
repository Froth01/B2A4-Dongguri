import { Link } from 'react-router-dom'
import './css/Navbar.css'
import Menu from './Menu'
import UserImg from '../Common/UserImg'
import { useSelector } from 'react-redux'

function Navbar() {
  const navBarBtnList = useSelector(state => state.navBarBtn.list)
  
  return (
    <div className='navbar'>
      <div className='logo pulse-shrink'>
        <Link to="/">
          <img src="/img/navbar/logocut.png" alt="Logo" />
        </Link>
      </div>
      <div className='menus'>
        {navBarBtnList.map(([imgUrl, path], index) => (
          <Link to={path} key={index}>
            <Menu imgUrl={imgUrl} />
          </Link>
        ))}
      </div>
      <UserImg />
    </div>
  )
}

export default Navbar