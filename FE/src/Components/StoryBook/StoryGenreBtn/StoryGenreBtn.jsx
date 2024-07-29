import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import './css/StoryGenreBtn.css'

function StoryGenreBtn() {
  const genreBtnList = useSelector(state => state.genreBtn.list)

  return(
    <div className="storygenrebtn">
    {genreBtnList.map(([src,alt,to], index)=> (
      <Link to = { to } key={index} >
        <img src={src} alt={alt} />
      </Link>
    ))}
    </div>
  )
}


export default StoryGenreBtn