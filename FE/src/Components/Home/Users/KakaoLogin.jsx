
      
const SocialKakao = ()=>
  {
      const Rest_api_key='0536894c82d8dda2013ee7211364733a' //REST API KEY
      const redirect_uri = `${window.location.origin}/kakao-callback` //Redirect URI
      // oauth 요청 URL
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
      const handleLogin = ()=>{
          window.location.href = kakaoURL
      }
      return(
      <>
      <button onClick={handleLogin}>카카오 로그인</button>
      </>
      )
  }
  export default SocialKakao