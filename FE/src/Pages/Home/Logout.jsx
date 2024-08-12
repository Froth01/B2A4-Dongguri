import { useEffect } from "react"
import { fetchLogout } from "../../Api/api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuthState } from '../../slices/authSlice'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    async function GetLogout () {
      const result = await fetchLogout();  
      
      console.log(result)
      return result
    }

    GetLogout();
    navigate('/')
    dispatch(resetAuthState());
    localStorage.removeItem('persist:userInfo')
  },[navigate])

  return (
    <div>Logout....</div>
  )
}

export default Logout


// import { useEffect } from "react";
// import { fetchLogout } from "../../Api/api";
// import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용

// function Logout() {
//   const navigate = useNavigate(); // useNavigate 훅 초기화

//   useEffect(() => {
//     async function handleLogout() {
//       try {
//         const result = await fetchLogout();
//         console.log(result);
//       } catch (error) {
//         console.error('로그아웃 실패:', error.data);
//       } finally {
//         // 로그아웃 후 로컬 스토리지에서 사용자 정보 삭제
//         localStorage.removeItem('persist:userInfo');
//         // 메인 페이지로 리다이렉트
//         navigate('/');
//       }
//     }

//     handleLogout();
//   }, [navigate]);

//   return (
//     <div>Logout....</div>
//   );
// }

// export default Logout;
