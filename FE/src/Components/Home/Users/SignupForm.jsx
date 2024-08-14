
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, setAuthObject, signup } from '../../../slices/authSlice';
import UserForm from '../Account/UserForm';
import '../Account/css/UserForm.css'
import './css/SignupForm.css'
import { imgUpload } from '../../../slices/imgSlice';
import { setUserObject } from '../../../slices/userInfoSlice';
import { fetchCheckNickname } from '../../../Api/api';

const SignupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUserData = location.state ? location.state.user.data : {};
  const [formData, setFormData] = useState({
    name: `${initialUserData.name}`,
    email:`${initialUserData.email}`,
    nickname: '',
    profileImageUrl: '',
    oauthServerType: initialUserData.oauthServerType || 'KAKAO',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [nowNick, setNowNick] = useState('');
  const [nicknameCheck, setNicknameCheck] = useState(null) // 닉네임 중복 확인 상태 초기화
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('')
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isTest = params.get('test');

    if (!location.state && !isTest) {
      // location.state가 없는 경우, 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  }, [location, navigate]);

  const handleNicknameChange = (e) => {
    setNowNick(e.target.value)
    setNicknameCheck(null) // 닉네임이 변경될 때마다 중복 확인 상태 초기화
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resultAction = await dispatch(imgUpload(file))
        const imgUrlBack = resultAction.payload
        setSelectedImage(imgUrlBack)
        setFormData({
          ...formData,
          profileImageUrl: imgUrlBack,
        });
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if (nicknameCheck !== true) {  // 닉네임 중복 확인이 통과되지 않으면 수정 방지
      return;
    }
    try {
      // 회원가입 처리
      const user = await dispatch(signup(formData)).unwrap();
      // 유저 정보 저장
      await dispatch(setAuthObject(user.data)); // 유저 정보를 저장
      navigate('/'); // 유저가 등록되어 있으면 홈페이지로 이동
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleCheckNickName = async() => {
    const response = await fetchCheckNickname(nowNick)
    setNicknameCheck(response.data.available)
    if (response.data.available) {
      setNicknameCheckMessage('이용 가능한 닉네임입니다');
    } else {
      setNicknameCheckMessage('이미 사용 중인 닉네임입니다');
    }
  }
  return (
    // <div className='signupform'>
    //   {/* {error && <p>{error.message}</p>} */}
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임" />
    //     <input type="file" name="profileImage"  onChange={handleImageChange} />
    //     {preview && <img src={preview} alt="프로필 미리보기" style={{ width: '100px', height: '100px' }} />}
    //     <button type="submit">회원가입</button>
    //   </form>
    //   {loading && <p>Loading...</p>}
    // </div>
    <div className='signupform'>
    <div className='userprofileimg' onClick={() => document.getElementById('imageUpload').click()}>
      <img src={selectedImage ? selectedImage : 'img/home/userdefault.png'} alt="profile" />
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
      <div className='nicknamedetail'>
        <input
        type="text"
        value={nowNick}
        name="text"
        className="nickinput"
        onChange={handleNicknameChange}
      />
      <button className='updatebtn nickbtn' onClick={handleCheckNickName}>
        중복체크
      </button>
      </div>
      
    </div>
    
    {nicknameCheckMessage && <div className="nickname-check-message">{nicknameCheckMessage}</div>}
    <button 
      className='updatebtn userformbtn' 
      onClick={handleFormSubmit} 
      disabled={nicknameCheck !== true}  // 중복 확인이 통과되지 않으면 비활성화
    >
      가입하기
    </button>
  </div>
  );
};

export default SignupForm;