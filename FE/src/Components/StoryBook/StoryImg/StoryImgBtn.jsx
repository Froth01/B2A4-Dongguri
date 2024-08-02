import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOriginalImageUrl, selectOriginalImageUrl } from "../../../slices/makeStorySlice";
import './css/StoryImgBtn.css';
import PropTypes from 'prop-types'

function StoryImgBtn({setIsUpload}) {
  const [uploadImg, setUploadImg] = useState(null);
  const dispatch = useDispatch()
  const originalImageUrl = useSelector(selectOriginalImageUrl)

  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setUploadImg(imgUrl);
      dispatch(setOriginalImageUrl(imgUrl)) // 액션 디스패치해서 상태 업데이트
      setIsUpload(true)
      console.log('Image uploaded:', imgUrl); // 콘솔에 업로드된 이미지 URL 출력
      console.log('Current originalImageUrl in state:', originalImageUrl); // 콘솔에 현재 상태의 이미지 URL 출력
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
        {uploadImg && (
          <img 
            src={uploadImg}
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

StoryImgBtn.propTypes = {
  setIsUpload: PropTypes.func.isRequired,
};


export default StoryImgBtn;
