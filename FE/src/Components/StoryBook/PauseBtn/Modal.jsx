import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Modal.css'

function Modal({setModal}) {
  return (
    <div className='modal'>
      <div className='btn'> 
        <img src="/img/storybook/pausebtn/GoGoRing.png" alt="묻고 떠블로 가! 버튼" onClick={()=>setModal(false)}/>
        <h1>계속하기</h1>
      </div>
      
      
        <Link to='/'>
        <div className='btn'> 
          <img src="/img/storybook/pausebtn/Stop.png" alt="나가기 버튼" />  
          <h1>나가기</h1>
        </div>
        </Link>
        
      
    </div>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
};


export default Modal