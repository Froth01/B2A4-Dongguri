import './css/AvatarList.css'

function AvatarList() {
  const avatarImgList = [
    ['/img/avatars/geyomi_ONE.png','겨미','Lv. 1'],
    ['/img/avatars/geoni_ONE.png','거니','Lv. 1'],
    ['/img/avatars/ili_ONE.png','일이','Lv. 1'],
    ['/img/avatars/bini_ONE.png','비니','Lv. 1'],
    ['/img/avatars/minni_ONE.png','미니','Lv. 1']
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