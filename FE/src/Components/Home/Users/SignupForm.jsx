
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, signup } from '../../../slices/authSlice';
import UserForm from '../Account/UserForm';
import '../Account/css/UserForm.css'
import './css/SignupForm.css'
import { imgUpload } from '../../../slices/imgSlice';
import { setUserObject } from '../../../slices/userInfoSlice';

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
  const [preview, setPreview] = useState(null);
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

  const handleChange = (e) => {
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
        setFormData({
          ...formData,
          profileImageUrl: imgUrlBack,
        });
        setPreview(imgUrlBack);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // 회원가입 처리
      const user = await dispatch(signup(formData)).unwrap();
      // 유저 정보 저장
      await dispatch(setUserObject(user.data)); // 유저 정보를 저장
      navigate('/'); // 유저가 등록되어 있으면 홈페이지로 이동
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='signupform'>
      {/* {error && <p>{error.message}</p>} */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임" />
        <input type="file" name="profileImage"  onChange={handleImageChange} />
        {preview && <img src={preview} alt="프로필 미리보기" style={{ width: '100px', height: '100px' }} />}
        <button type="submit">회원가입</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SignupForm;