// import React from 'react';
import Modal from 'react-modal';
import './css/LoadingModal.css';
import PropTypes from 'prop-types'; 
import { useEffect } from 'react';

Modal.setAppElement('#root');

const LoadingModal = ({ isOpen }) => {
  useEffect(() => {
    console.log('LoadingModal isOpen:', isOpen); // isOpen 상태를 콘솔에 출력
  }, [isOpen]); // isOpen이 변경될 때마다 실행

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Loading"
      className="loading-modal"
      overlayClassName="loading-overlay"
    >
      <div className="loading-content">
        <h2>로딩 중...</h2>
        {/* 여기에 로딩 스피너 추가 가능 */}
      </div>
    </Modal>
  );
};

LoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired // isOpen의 타입과 필수 여부 명시
};

export default LoadingModal;
