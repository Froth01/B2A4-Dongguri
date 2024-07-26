import './css/Navbar.css'
import Menu from './Menu'
import UserImg from './UserImg'
import { useSelector } from 'react-redux'

function Navbar() {
  const imgUrlList = useSelector(state => state.imgUrl.list)
  
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src="/img/navbar/logocut.png" alt="Logo" />
      </div>
      <div className='menus'>
        {imgUrlList.map((imgUrl, index) => (
          <Menu key={index} imgUrl={imgUrl} />
        ))}
      </div>
      <UserImg />
    </div>
  )
}

export default Navbar