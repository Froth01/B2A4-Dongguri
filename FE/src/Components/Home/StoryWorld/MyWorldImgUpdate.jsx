import { useEffect, useState } from 'react'
import './css/MyWorldImgUpdate.css'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateWorldInfo, setWorldObject } from '../../../slices/worldInfoSlice';
import PropTypes from 'prop-types'

function MyWorldImgUpdate({myCardList}) {
  const dispatch = useDispatch();
  const worldInfo = useSelector(state => state.worldInfo.object)
  const [storybookIdList, setStorybookIdList] = useState([])
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    // myCardList가 비어 있지 않고 storybookIdList가 비어 있을 때만 실행
    if (myCardList.length > 0 && storybookIdList.length === 0) {
      const resultList = worldInfo.storybooks.map(storybook => storybook.storybookId);
      setStorybookIdList(resultList);
      console.log('유저월드 동화 리스트:', resultList);
      console.log('월드인포에있는 리스트:', worldInfo.storybooks)
      console.log('id 뽑아낸 리스트소스:', myCardList)
    }
  }, [myCardList]);

  const EditClick = (e) => {
    if (e.target.closest('.worldimgedit')) return;
    setIsEditOpen(!isEditOpen);
  }

  const handleMenuSelect = (storybookId) => {
    if (storybookIdList.includes(storybookId)) {
      setStorybookIdList(storybookIdList.filter(id => id !== storybookId));
      console.log('표기그림 변경중 : ', storybookIdList)
      } else {
        if (storybookIdList.length < 5) {
        setStorybookIdList([...storybookIdList, storybookId])
        console.log('표기그림 변경중 : ', storybookIdList)
      } else {
        alert('그림은 최대 5개까지 선택 가능합니다!')
      }
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
          {myCardList.map(storybook => (
            <div
            key={storybook.storybookId}
            className={`editimgmenu ${ storybookIdList.includes(storybook.storybookId) ? 'checked': ''}`}
            onClick={() => 
            handleMenuSelect(storybook.storybookId)}
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

MyWorldImgUpdate.propTypes = {
  myCardList: PropTypes.array.isRequired
}
export default MyWorldImgUpdate