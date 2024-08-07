import { useState } from "react"
import './css/PauseBtn.css'
import Modal from "./Modal"

function PauseBtn() {
  let [modal, setModal] = useState(false)
  
  return (
    <div className='pausebtn'>
        <button onClick={()=>{setModal(true)}}>
          <img src="/img/storybook/pausebtn/PauseBtn.png" alt="일시정지" />
        </button>
        {modal === true ? <Modal setModal={setModal}/> :null}
    </div>
  )
}

export default PauseBtn