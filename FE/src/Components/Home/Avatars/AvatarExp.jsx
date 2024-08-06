import './css/AvatarExp.css'

function AvatarExp() {
  const done = 4

  return (
    <div className="avatarexp">
      <div className="avatarlv">
        겨미 레벨 투~
      </div>
      <div className="expdetail">
        {[...Array(parseInt(done))].map((num) => (
          <div key={num} className="book">
            <img src="/img/avatars/bookopen.png" alt="exp1" />
          </div>
        ))}
        {[...Array(parseInt(10-done))].map((num) => (
          <div key={num} className="book">
            <img src="/img/avatars/bookclose.png" alt="exp0" />
          </div>
        ))}
      </div>
      <h3>동화를 {10-done}권 더 만들면 동그리가 자라나요!</h3>
    </div>
  )
}

export default AvatarExp