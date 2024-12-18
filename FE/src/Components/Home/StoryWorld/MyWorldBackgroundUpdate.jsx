import { useEffect, useState } from 'react'
import './css/MyWorldBackgroundUpdate.css'
import { useDispatch, useSelector } from 'react-redux'
import { imgUpload } from '../../../slices/imgSlice'
import { UpdateWorldInfo, setWorldObject } from '../../../slices/worldInfoSlice';

function MyWorldBackgroundUpdate() {
  const dispatch = useDispatch();
  const worldInfo = useSelector(state => state.worldInfo.object)
  const [storybookIdList, setStorybookIdList] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedBack, setSelectedBack] = useState('WOODS')
  const [imgUrlBack, setImgUrlBack] = useState(null)
  const [preview, setPreview] = useState(null);

  useEffect (() => {
    const gaveList = worldInfo.storybooks
    const resultList = []
    
    gaveList.forEach(storybook => resultList.push(storybook.storybookId));
    setStorybookIdList(resultList)
  },[worldInfo])

  useEffect(() =>{
    console.log(selectedBack)
  },[])

  const EditClick = (e) => {
    if (e.target.closest('.worldbgedit')) return;
    setIsEditOpen(!isEditOpen);
  }

  const handleMenuSelect = (e, type) => {
    document.querySelectorAll('.editbgmenu').forEach(item => {
      item.classList.remove('checked');
    });
    e.currentTarget.classList.add('checked');
    setSelectedBack(type)
  }

  const handleMenuChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setSelectedBack('CUSTOM')
        const resultAction = await dispatch(imgUpload(file))
        setImgUrlBack(resultAction.payload)
        setPreview(resultAction.payload);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const patchInfo = {
        storyWorldId: worldInfo.storyWorldId,
        patchForm: {
          backgroundType: selectedBack,
          customBackgroundUrl: imgUrlBack,
          storybookIds: storybookIdList
        }
      }
      const resultAction = await dispatch(UpdateWorldInfo(patchInfo))
      const updatedWorld = resultAction.payload
      dispatch(setWorldObject(updatedWorld))
    } catch (error) {
      {throw error;}
    }
  };

  

  return (
    <div className='myworldbgupdate' onClick={EditClick}>
      <div className='myworldbgupdatebtn'>
      배경 수정
      </div>
      {isEditOpen &&  (
        <div className={`worldbgedit ${isEditOpen ? 'show' : ''}`}>
          <div className='editbgmenu' onClick={(e) => handleMenuSelect(e, 'WOODS')}>
            <img src="/img/storyworld/WOODS.jpg" alt="WOODS" />
          </div>
          <div className='editbgmenu' onClick={(e) => handleMenuSelect(e, 'WINTER')}>
            <img src="/img/storyworld/WINTER.jpg" alt="WINTER" />
          </div>
          <div className='editbgmenu' onClick={(e) => handleMenuSelect(e, 'CASTLE')}>
            <img src="/img/storyworld/CASTLE.jpg" alt="CASTLE" />
          </div>
          <div className='editbgmenu'>
            <label htmlFor="image">
              {preview ? <img src={preview} alt="프로필 미리보기" />: null}
              <div className='editbginput'>나만의 배경</div>
            </label>
            <input type="file" name="image" id="image"  onChange={handleMenuChange} />
          </div>
        </div>)}
      
      {isEditOpen && (
        <div className="bgsubmitBtn" onClick={handleSubmit}>
            적용하기
        </div>
      )}
    </div>
  )
}

export default MyWorldBackgroundUpdate