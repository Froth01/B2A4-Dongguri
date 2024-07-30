import { useState } from "react";
import './css/StoryImgBtn.css';
import PropTypes from 'prop-types'

function StoryImgBtn({setIsUpload}) {
  const [uploadImg, setUploadImg] = useState(null);
  
  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setUploadImg(imgUrl);
      setIsUpload(true)
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
