
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signup } from '../../../slices/authSlice';
import UserForm from '../Account/UserForm';
import '../Account/css/UserForm.css'

const SignupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUserData = location.state ? location.state.user : {};
  const [formData, setFormData] = useState({
    name: initialUserData.name || '',
    email: initialUserData.email || '',
    nickName: '',
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImageUrl: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('nickName', formData.nickName);
    formDataToSubmit.append('profileImageUrl', formData.profileImageUrl);
    formDataToSubmit.append('oauthServerType', formData.oauthServerType);
    
    dispatch(signup(formDataToSubmit));
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      <UserForm />
      <form onSubmit={handleSubmit}>
        <input type="text" name="nickName" value={formData.nickName} onChange={handleChange} placeholder="닉네임" />
        <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="프로필 미리보기" style={{ width: '100px', height: '100px' }} />}
        <button type="submit">회원가입</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SignupForm;