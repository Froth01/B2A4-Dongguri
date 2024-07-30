// /src/components/Signup.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../slices/authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nickName: '',
    profileImageUrl: '',
    oauthServerType: 'KAKAO',
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일" />
        <input type="text" name="nickName" value={formData.nickName} onChange={handleChange} placeholder="닉네임" />
        <input type="text" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} placeholder="프로필 이미지 URL" />
        <button type="submit">회원가입</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Signup;
