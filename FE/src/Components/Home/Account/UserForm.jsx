import './css/UserForm.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserInfo, setAuthObject } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { imgUpload } from '../../../slices/imgSlice';
import { deleteUser } from '../../../Api/api';
import { resetAuthState } from '../../../slices/authSlice';
import { fetchCheckNickname } from '../../../Api/api';

function UserForm() {
  const currentUser = useSelector(state => state.auth.object)
  const [nowNick, setNowNick] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nicknameCheck,setNicknameCheck] = useState()
  const [nicknameCheckMessage,setNicknameCheckMessage] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.nickname) {
      setNowNick(currentUser.nickname);
    }
    if (currentUser && currentUser.profileImageUrl) {
      setSelectedImage(currentUser.profileImageUrl);
    }
  }, [currentUser]);

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
      ...currentUser,
      nickname: nowNick,
      profileImageUrl: selectedImage
    }));
    dispatch(UpdateUserInfo({
      nickname: nowNick,
      profileImageUrl: selectedImage
    }))
    // 예: API 요청을 통해 서버에 업데이트된 유저 정보를 보냅니다.
    navigate('/')
  };


  const handleDeleteUser = async () => {
        const result = await deleteUser();
        console.log(result)
        dispatch(resetAuthState());
      navigate('/')
      localStorage.removeItem('persist:userInfo')
  }

  const handleCheckNickName = async() => {
    const response = await fetchCheckNickname(nowNick)
    setNicknameCheck( response.data.available)
    // const result = response.data.available
    if (nicknameCheck) {
      setNicknameCheckMessage('이용 가능한 닉네임입니다');
    } else {
      setNicknameCheckMessage('이미 사용 중인 닉네임입니다');
    }
    console.log(nicknameCheck)
  }

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
      <button className='updatebtn' onClick={handleCheckNickName} >
        닉네임 중복 확인
      </button>
      {nicknameCheckMessage}
      {/* {nicknameCheckMessage && <p className="nickname-check-message">{nicknameCheckMessage}</p>} */}
      <button className='updatebtn' onClick={handleDeleteUser}>
        탈퇴하기
      </button>
    </div>
  );
}

export default UserForm;
