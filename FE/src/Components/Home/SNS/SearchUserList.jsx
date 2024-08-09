
import './css/SearchUserList.css';
import PropTypes from 'prop-types'

function SearchUserList({ user = {} }) {
  return (
    <div className='user-card'>
      <img src={user.profileImageUrl || ''} alt={`${user.nickname || '유저'}의 프로필`} className='user-card__image' />
      <div className='user-card__details'>
        <h3 className='user-card__name'>{user.nickname || '닉네임'}</h3>
        <p className='user-card__id'>ID: {user.userId || 'ID'}</p>
      </div>
    </div>
  );
}

SearchUserList.propTypes = {
  user: PropTypes.array.isRequired
}

export default SearchUserList;
