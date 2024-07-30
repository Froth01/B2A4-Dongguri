import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Modal.css'

function Modal({setModal}) {
  return (
    <div className='modal'>
      <div className='btn'> 
        <img src="/img/storybook/pausebtn/GoGoRing.png" alt="묻고 떠블로 가! 버튼" onClick={()=>setModal(false)}/>
        <h3>계속하기</h3>
      </div>
      
      <div className='btn'> 
        <Link to='/'>
          <img src="/img/storybook/pausebtn/Stop.png" alt="나가기 버튼" />  
        </Link>
        <h3>나가기</h3>
      </div>
    </div>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
};


export default Modal