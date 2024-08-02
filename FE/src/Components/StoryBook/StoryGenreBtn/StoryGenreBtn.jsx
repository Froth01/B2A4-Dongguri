import { Link } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'
import { setGenre,selectGenre } from "../../../slices/makeStorySlice"
import { selectGenreBtnList } from "../../../slices/genreBtnSlice";
import './css/StoryGenreBtn.css'

function StoryGenreBtn() {
  const genreBtnList = useSelector(selectGenreBtnList);
  const selectedGenre = useSelector(selectGenre)
  const dispatch = useDispatch()

  const handleGenreClick = (genre) => {
    dispatch(setGenre(genre)) // 액션을 디스패치하여 상태를 업데이트
    console.log('Genre selected:', genre); // 콘솔에 선택된 장르 출력
    console.log('Current genre in state:', selectedGenre); // 콘솔에 현재 상태의 장르 출력
  }
  
  return(
    <div className="storygenrebtn">
    {genreBtnList.map(([src,alt,to,genre], index)=> (
      <Link to = { to } key={index} onClick={() => handleGenreClick(genre)}>
        <img src={src} alt={alt} />
      </Link>
    ))}
    </div>
  )
}


export default StoryGenreBtn