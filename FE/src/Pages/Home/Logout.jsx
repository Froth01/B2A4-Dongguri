import { useEffect } from "react"
import { fetchLogout } from "../../Api/api"
import { Navigate } from "react-router-dom";


function Logout() {

  useEffect(() => {
    async function GetLogout () {
      const result = await fetchLogout();
      console.log(result)
      return result
    }
    GetLogout();
    localStorage.removeItem('persist:userInfo')
    Navigate('/')
  },[])

  return (
    <div>Logout....</div>
  )
}

export default Logout