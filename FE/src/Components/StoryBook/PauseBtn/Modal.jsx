import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Modal({setModal}) {
  return (
    <div>
      <img src="/img/storybook/pausebtn/GoGoRing.png" alt="묻고 떠블로 가! 버튼" onClick={()=>setModal(false)}/>

      <Link to='/'>
        <img src="/img/storybook/pausebtn/Stop.png" alt="나가기 버튼" />
      </Link>
    </div>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
};


export default Modal