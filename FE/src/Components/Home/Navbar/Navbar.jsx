import { Link } from 'react-router-dom'
import './css/Navbar.css'
import Menu from './Menu'
import UserImg from '../Common/UserImg'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserId } from '../../../slices/navBarBtnSlice'

function Navbar() {
  const navBarBtnList = useSelector(state => state.navBarBtn.list)
  const userInfo = useSelector(state => state.userInfo.object)
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.id) {
      dispatch(setUserId(userInfo.id));
    }
  },[userInfo.id,dispatch]);

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
      <div className='userimg'>
      <label className="popup">
        <input type="checkbox" />
        <div tabIndex="0" className="burger">
          <UserImg userInfo={userInfo}/>
        </div>
        <nav className="popup-window">
          <ul>
            <li>
              <Link to={`/users/${userInfo.id}`}>
                <button>
                  프로필 변경
                </button>
              </Link>
            </li>
            <li>
              <button>
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      </label>
      </div>
    </div>
  )
}

export default Navbar