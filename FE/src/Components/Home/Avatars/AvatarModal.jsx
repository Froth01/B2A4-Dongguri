import PropTypes from 'prop-types';
import './css/AvatarModal.css';
import { useState } from 'react';

function AvatarModal({ isOpen, onClose, id, avatar }) {
  
  if (!isOpen) return null;

  // const toggleFollow = (userId) => {
  //   setUsers(prevUsers =>
  //     prevUsers.map(user =>
  //       user.id === userId
  //         ? { ...user, isFollowing: !user.isFollowing }
  //         : user
  //     )
  //   );
  // };

  return (
    <div className="a-modal-overlay" onClick={onClose}>
      <div className="a-modal-content" onClick={e => e.stopPropagation()}>
        <h2>동그리상세</h2>
        
      </div>
      <button onClick={onClose} className="f-close-button">X</button>
    </div>
  );
}

AvatarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  avatar: PropTypes.object.isRequired
};

export default AvatarModal;