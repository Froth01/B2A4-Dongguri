import { useState } from 'react'
import './css/MyWorldUpdate.css'
import { useDispatch } from 'react-redux'
import { imgUpload } from '../../../slices/imgSlice'

function MyWorldUpdate() {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(1)
  const EditClick = () => {
    setIsEditOpen(!isEditOpen)
    console.log(isEditOpen)
  }
  const handleMenuChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resultAction = await dispatch(imgUpload(file))
        const imgUrlBack = resultAction.payload
        // setFormData({
        //   ...formData,
        //   배경이미지: imgUrlBack,
        // });
        console.log(imgUrlBack)
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
      console.log(user)
      console.log(user.data)
      await dispatch(setUserObject(user.data)); // 유저 정보를 저장
      navigate('/'); // 유저가 등록되어 있으면 홈페이지로 이동
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='myworldupdate' onClick={EditClick}>
      {isEditOpen && (
        <div className="worldedit">
          <div className='editmenu' onClick={() => setSelectedMenu(1)}>
            옵션1
          </div>
          <div className='editmenu' onClick={() => setSelectedMenu(2)}>
            옵션2
          </div>
          <div className='editmenu' onClick={() => setSelectedMenu(3)}>
            옵션3
          </div>
          <div className='editmenu editinput' onClick={() => setSelectedMenu(4)}>
            <input type="file" name="profileImage"  onChange={handleMenuChange} />
          </div>
        </div>)}
      {/* {isEditOpen && (
        <div className="submitBtn">
          <button onClick={handleSubmit}>
            서브밋이유
          </button>
        </div>
      )} */}
    </div>
  )
}

export default MyWorldUpdate