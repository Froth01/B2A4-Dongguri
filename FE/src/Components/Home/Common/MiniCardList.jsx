import MiniCard from './MiniCard'
import './css/MiniCardList.css'

function MiniCardList() {
  const dummyList = ['1','2','3','4','5','6','7']

  return (
    <div className='minicardlist'>
      {dummyList.map((num, index) => (
        <MiniCard key={index} num={num}/>
      ))}
    </div>
  )
}

export default MiniCardList