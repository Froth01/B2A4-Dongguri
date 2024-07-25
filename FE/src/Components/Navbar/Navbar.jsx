import './css/Navbar.css'
import Menu from './Menu'
import UserImg from './UserImg'

function Navbar() {
  return (
    <div className='navbar'>
      <div>
        <img src="/img/navbar/logocut.png" alt="Logo" />
      </div>
      <div className='menus'>
        <Menu imgUrl={'/img/navbar/storybook.png'}/>
        <Menu imgUrl={'/img/navbar/storyworld.png'}/>
        <Menu imgUrl={'/img/navbar/avatars.png'}/>
        <Menu imgUrl={'/img/navbar/sns.png'}/>
      </div>
      <div>
        <UserImg />
      </div>
    </div>
  )
}

export default Navbar