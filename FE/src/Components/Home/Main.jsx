import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import MainBtn from "./MainBtn"
import './css/Main.css'
import { useEffect, useState } from "react"
import { setTargetUser } from "../../slices/mainBtnSlice"
import { getFollowList, setFollowingList } from "../../slices/followSlice"

function Main() {
  const mainBtnList = useSelector(state => state.mainBtn.list)
  const currentUser = useSelector(state => state.auth.object)
  const followingList = useSelector(state => state.follow.list)
  const [infoResult, setInfoResult] = useState([])
  const [isLast, setIsLast] = useState(false)
  const [page, setPage] = useState(0)
  const dispatch = useDispatch();
  console.log(followingList)
  const fetchFollowingInfo = async () => {
    try {
      const followForm = {
        type: 'following',
        page: page + 1
      }
      if (!isLast) {
      const resultNext = await dispatch(getFollowList(followForm)).unwrap();
      const nextPageUsers = resultNext.content
      console.log('받아온 다음유저들', nextPageUsers)
      const followIdList = nextPageUsers.map(follow => ({
        followId: follow.followId,
        userId: follow.userId
      }));
      console.log('그걸로 만든 팔로아이디리스트', followIdList)
      setInfoResult(infoResult => [...infoResult, ...followIdList]);
      console.log('inforesult', infoResult)
      setIsLast(resultNext.last)
      setPage(page + 1)
      console.log('다만든거',followingList)
      }
    } catch {
      error => console.log(error)
    }
  }
  
  useEffect(() => {
    if (currentUser.userId) {
      dispatch(setTargetUser(currentUser));
      setFollowingList([]);
      setPage(0);
      setIsLast(false)
      fetchFollowingInfo();
    }
  },[currentUser.userId,dispatch]);

  useEffect(() => {
    if (currentUser.userId !== 0) {
    if (infoResult.length > 0 && isLast) {
      dispatch(setFollowingList(infoResult));
    } else if (!isLast) {
      fetchFollowingInfo();
    }}
  },[infoResult, isLast, dispatch]);
  return (
    <div className="main">
      {mainBtnList.map(([mainBtn, path], index) => (
        <Link className="mainbtn" to={path} key={index}>
          <MainBtn imgUrl={mainBtn}/>
        </Link>
      ))}
    </div>
  )
}

export default Main