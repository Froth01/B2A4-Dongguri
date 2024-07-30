import './css/UserForm.css'
import PropTypes from 'prop-types';

function UserForm({userInfo}) {
  return (
    <div className='userform'>
      <div className='userprofileimg'>
        <img src={userInfo.profileImageUrl} alt="profile" />
      </div>
      <div className='nickname'>
        <label htmlFor="text">닉네임</label>
        <input type="text" value={userInfo.nickName} name="text" className="input" />
      </div>
      <button className='updatebtn'>
        수정하기
      </button>
    </div>
  )
}

UserForm.propTypes = {
  userInfo: PropTypes.object.isRequired
}
export default UserForm