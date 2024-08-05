import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOriginalImageUrl, selectOriginalImageUrl } from "../../../slices/makeStorySlice";
import './css/StoryImgBtn.css';
// import PropTypes from 'prop-types'

function StoryImgBtn() {
  // const [uploadImg, setUploadImg] = useState(null);
  const dispatch = useDispatch()
  const originalImageUrl = useSelector(selectOriginalImageUrl)

  useEffect(() => {
    // localStorage에서 이미지 URL 가져오기
    const savedImageUrl = localStorage.getItem('uploadedImage');
    if (savedImageUrl) {
      dispatch(setOriginalImageUrl(savedImageUrl));
    }
  }, [dispatch]);
  
  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();  // Base64 url 가져옴
      reader.onloadend = () => {
        const base64data = reader.result;  //Base64로 변환된것 url로 변환
        localStorage.setItem('uploadedImage', base64data); // localStorage에 Base64 인코딩된 이미지 저장
        dispatch(setOriginalImageUrl(base64data)); // Redux 상태 업데이트
        // console.log('Image uploaded:', base64data); // 콘솔에 업로드된 이미지 출력
        console.log('Current originalImageUrl in state:', originalImageUrl); // 콘솔에 현재 상태의 이미지 URL 출력
      };
      reader.readAsDataURL(file); // 파일을 읽어서 Base64 데이터 URL로 변환
    }
  };

  return (
    <div className="storyimg">
      <div className="image-container" onClick={() => document.getElementById('imgUploadInput').click()}>
        <img 
          src="/img/storybook/storyimg/StoryImg.png"
          alt="기본 이미지"
          className="base-image"
        />
        {originalImageUrl && (
          <img 
            src={originalImageUrl}
            alt="업로드된 이미지"
            className="uploaded-image"
          />
        )}
      </div>
      <input
        type="file"
        id="imgUploadInput"
        style={{ display: 'none' }}
        onChange={handleImgUpload}
      />
    </div>
  );
}

// StoryImgBtn.propTypes = {
//   setIsUpload: PropTypes.func.isRequired,
// };


export default StoryImgBtn;
