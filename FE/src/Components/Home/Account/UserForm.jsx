import './css/UserForm.css'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthObject } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { imgUpload } from '../../../slices/imgSlice';

function UserForm({userInfo}) {
  const [nowNick, setNowNick] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.nickname) {
      setNowNick(userInfo.nickname);
    }
    if (userInfo && userInfo.profileImageUrl) {
      setSelectedImage(userInfo.profileImageUrl);
    }
  }, [userInfo]);

  const handleNicknameChange = (event) => {
    setNowNick(event.target.value);
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const resultAction = await dispatch(imgUpload(file))
      const imgUrlBack = resultAction.payload
      console.log('UserForm > selectedImage : ', imgUrlBack)
      setSelectedImage(imgUrlBack);
    }
  };

  const handleFormSubmit = () => {
    // 업로드한 이미지와 수정된 닉네임을 유저정보에 저장하는 로직 구현
    dispatch(setAuthObject({
      ...userInfo,
      nickname: nowNick,
      profileImageUrl: selectedImage
    }));

    console.log('Updated User Info:', userInfo);
    // 예: API 요청을 통해 서버에 업데이트된 유저 정보를 보냅니다.
    navigate('/')
  };

  return (
    <div className='userform'>
      <div className='userprofileimg' onClick={() => document.getElementById('imageUpload').click()}>
        <img src={selectedImage} alt="profile" />
      </div>
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className='nickname'>
        <label htmlFor="text">닉네임</label>
        <input
          type="text"
          value={nowNick}
          name="text"
          className="input"
          onChange={handleNicknameChange}
        />
      </div>
      <button className='updatebtn' onClick={handleFormSubmit}>
        수정하기
      </button>
    </div>
  );
}

UserForm.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default UserForm;
