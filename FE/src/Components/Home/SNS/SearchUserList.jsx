
import './css/SearchUserList.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SearchUserList({ userList = [] }) { // user를 userList로 변경하고 기본값을 빈 배열로 설정
  console.log('searchUser',userList)
  const navigate = useNavigate();

  const handleClick = (userId) => {
    if (userId) {
      navigate(`/storyworld/${userId}`);
    }
  };

  return (
    <div className='user-list'>
      {userList.length === 0 ? (  // userList가 빈 배열일 경우
        <div className='no-results'>
          검색 결과가 없습니다.
        </div>
      ) : (
        userList.map((user) => (
          <div key={user.userId} className='user-card' onClick={() => handleClick(user.userId)} style={{ cursor: 'pointer' }}>
            <img 
              src={user.profileImageUrl || ''} 
              alt={`${user.nickname || '유저'}의 프로필`} 
              className='user-card__image' 
            />
            <div className='user-card__details'>
              <h3 className='user-card__name'>{user.nickname || '닉네임'}</h3>
              <p className='user-card__id'>ID: {user.userId || 'ID'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

SearchUserList.propTypes = {
  userList: PropTypes.array.isRequired // PropTypes를 배열로 설정
};

export default SearchUserList;