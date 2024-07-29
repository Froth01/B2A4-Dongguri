import './css/AvatarList.css'

function AvatarList() {
  const avatarImgList = [
    ['/img/avatars/geyomi1.png','겨미','Lv. 1'],
    ['/img/avatars/geoni1.png','거니','Lv. 1'],
    ['/img/avatars/ili1.png','일이','Lv. 1'],
    ['/img/avatars/bini1.png','비니','Lv. 1'],
    ['/img/avatars/minni1.png','미니','Lv. 1']
  ]
  return (
    <div className='avatarlist'>
      <h3>내가 키운 동그리</h3>
      <div className='listdetail'>
        {avatarImgList.map(([imginfo,name,level], index) => (
          <div key={index} className='avatar'>
          <img src={imginfo} alt={name} />
          <div className='avatar-info'>
            <p className='name'>{name}</p>
            <p className='level'>{level}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarList