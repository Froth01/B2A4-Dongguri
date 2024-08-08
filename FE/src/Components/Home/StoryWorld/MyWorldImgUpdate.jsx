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
  const [selectedBack, setSelectedBack] = useState('WOODS')
  const [imgUrlBack, setImgUrlBack] = useState(null)

  useEffect (() => {
    const gaveList = worldInfo.storybooks
    const resultList = []
    gaveList.forEach(storybook => resultList.push(storybook.storybookId));
    setStorybookIdList(resultList)
    console.log('유저월드 동화 리스트' ,storybookIdList)
  },[worldInfo])

  useEffect(() =>{
    console.log(selectedBack)
  },[])

  const EditClick = (e) => {
    if (e.target.closest('.worldimgedit')) return;
    setIsEditOpen(!isEditOpen);
  }

  const handleMenuChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setSelectedBack('CUSTOM')
        const resultAction = await dispatch(imgUpload(file))
        setImgUrlBack(resultAction.payload)
        console.log('받아온이미지 : ', imgUrlBack)
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
    <div className='myworldimgupdate' onClick={EditClick}>
      {isEditOpen && (
        <div className={`worldimgedit ${isEditOpen ? 'show' : ''}`}>
          {worldInfo.storybooks.map(storybook => (
            <div
            key={storybook.storybookId}
            className='editimgmenu'
            onClick={() => 
            setStorybookIdList([...storybookIdList, storybook.storybookId])}
            >
            <img src={storybook.transparentImageUrl} alt={storybook.storybookId} />
          </div>
          ))}
        </div>
      )}
      {isEditOpen && (
        <div className="imgsubmitBtn">
          <button onClick={handleSubmit}>
            서브밋이유
          </button>
        </div>
      )}
    </div>
  )
}

export default MyWorldImgUpdate