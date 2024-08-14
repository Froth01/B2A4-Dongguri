import { Link } from 'react-router-dom'
import './css/Navbar.css'
import Menu from './Menu'
import UserImg from '../Common/UserImg'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTargetUser } from '../../../slices/navBarBtnSlice'

function Navbar() {
  const navBarBtnList = useSelector(state => state.navBarBtn.list)
  const currentUser = useSelector(state => state.auth.object)
  const dispatch = useDispatch();
  const popupClass =  currentUser.userId !== 0 ? "popup-window" : "popup-window small";
  const popupLiClass =  currentUser.userId !== 0 ? "" : "smallLi";

  useEffect(() => {
    if (currentUser.userId) {
      dispatch(setTargetUser(currentUser));
    }
    console.log('현재 유저 아이디: ',currentUser.userId)
  },[currentUser.userId,dispatch]);

  const burgerBlur = () => {
    setTimeout(() => {
      const checkbox = document.querySelector('.popup input');
      if (checkbox) {
        checkbox.checked = false; 
      }
    }, 100);
  };

  const handleLinkClick = () => {
    setTimeout(() => {
      const checkbox = document.querySelector('.popup input');
      if (checkbox) {
        checkbox.checked = false; 
      }
    }, 100);
  };

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
      <div className='userimgdiv'>
      <label className="popup">
        <input type="checkbox" />
        <div tabIndex="0" className="burger" onBlur={burgerBlur}>
          <UserImg userInfo={currentUser}/>
        </div>
        {currentUser.userId != 0 && <nav className={popupClass}>
          <ul>
            <li>
              <Link to={`/users/${currentUser.userId}`} onClick={handleLinkClick}>
                <button>
                  프로필 변경
                </button>
              </Link>
            </li>
            <li>
              <Link to={'/users/logout'}>
                <button>
                  로그아웃
                </button>
              </Link>
            </li>
          </ul>
        </nav>}
        {currentUser.userId===0 && <nav className={popupClass}>
          <ul>
            <li className={popupLiClass} onClick={handleLinkClick}>  
              <Link to={'/login'}>
              <button>
                로그인
              </button>
              </Link>
            </li>
          </ul>
        </nav>}
      </label>
      </div>
    </div>
  )
}

export default Navbar