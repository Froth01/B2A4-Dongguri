import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setTransformType, selectTransformType, selectMakeStory } from "../../../slices/makeStorySlice"
import { selectCircleBtnList } from "../../../slices/circleBtnSlice";
import { selectPathHistory } from '../../../slices/pathHistorySlice';
import { transformStorybook } from "../../../Api/api";
import './css/CircleBtn.css'

function CircleBtn() {
  const circleBtnList = useSelector(selectCircleBtnList);
  const selectedTransformType = useSelector(selectTransformType);
  const pathHistory = useSelector(selectPathHistory);
  const makeStory = useSelector(selectMakeStory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTransformTypeClick = async (transfromType, to) => {
    dispatch(setTransformType(transfromType));
    console.log('TransformType selected:', transfromType);
    console.log('Current genre in state:', selectedTransformType);

    if (pathHistory.includes('/storybook/storytoday')) {
      try {
        // Base64 데이터를 Blob으로 변환
        const base64Response = await fetch(makeStory.originalImageUrl);
        const blob = await base64Response.blob();
        console.log('Blob 변환 성공:', blob)

        // FormData 객체 생성   (오늘의 주제는 장르 없는데 어떡..?)
        const formData = new FormData();
        formData.append('genre', makeStory.genre);
        formData.append('transformType', makeStory.transformType);
        formData.append('originalImage', blob); // Blob 데이터를 추가
        makeStory.keyword.forEach((keyword, index) => {
          formData.append(`keyword[${index}]`, keyword);
        });
        
        // formData.forEach((value, key) => {
        //   console.log(key, value);
        // });

        // API 요청 보내기
        await transformStorybook(formData);

        // 페이지 이동
        navigate('/storybook/storyend');
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <div className="circlebtn">
      {circleBtnList.map(([src, alt, to, transfromType], index) => (
        <div key={index} onClick={() => handleTransformTypeClick(transfromType, to)} className="circle-link">
          <img src={src} alt={alt} />
        </div>
      ))}

         <ul>
          {pathHistory.map((path, index) => (
            <li key={index}>{path}</li>
          ))}
        </ul>


    </div>
  );
}

export default CircleBtn;
