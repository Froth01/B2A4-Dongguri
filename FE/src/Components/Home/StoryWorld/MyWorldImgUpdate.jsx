import { useEffect, useState } from 'react'
import './css/MyWorldImgUpdate.css'
import { useDispatch, useSelector } from 'react-redux'
import { imgUpload } from '../../../slices/imgSlice'
import { UpdateWorldInfo, setWorldObject } from '../../../slices/worldInfoSlice';

function MyWorldImgUpdate() {
  const dispatch = useDispatch();
  const worldInfo = useSelector(state => state.worldInfo.object)
  const [storybookIdList, setStorybookIdList] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect (() => {
    const gaveList = worldInfo.storybooks
    const resultList = []
    gaveList.forEach(storybook => resultList.push(storybook.storybookId));
    setStorybookIdList(resultList)
    console.log('유저월드 동화 리스트' ,storybookIdList)
  },[worldInfo])

  const EditClick = (e) => {
    if (e.target.closest('.worldimgedit')) return;
    setIsEditOpen(!isEditOpen);
  }

  const handleMenuSelect = (e, storybook) => {
    console.log(e.currentTarget)
    if (e.currentTarget.classList.contains('checked')) {
      e.currentTarget.classList.remove('checked');
      setStorybookIdList(storybookIdList.filter(id => id !== storybook.storybookId));
      } else {
        e.currentTarget.classList.add('checked');
        setStorybookIdList([...storybookIdList, storybook.storybookId])
      }
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const patchInfo = {
        storyWorldId: worldInfo.storyWorldId,
        patchForm: {
          backgroundType: worldInfo.backgroundType,
          customBackgroundUrl: worldInfo.customBackgroundUrl,
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
    <div className='myworldimgupdate' onClick={EditClick}>
      동화 수정
      {isEditOpen && (
        <div className={`worldimgedit ${isEditOpen ? 'show' : ''}`}>
          {worldInfo.storybooks.map(storybook => (
            <div
            key={storybook.storybookId}
            className='editimgmenu'
            onClick={() => 
            handleMenuSelect(storybook)}
            >
            <img src={storybook.transparentImageUrl} alt={storybook.storybookId} />
          </div>
          ))}
        </div>
      )}
      {isEditOpen && (
        <div className="imgsubmitBtn" onClick={handleSubmit}>
            적용하기
        </div>
      )}
    </div>
  )
}

export default MyWorldImgUpdate