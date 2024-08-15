// // // import React from 'react';
// // import Modal from 'react-modal';
// // import './css/LoadingModal.css';
// // import PropTypes from 'prop-types'; 
// // import { useEffect,useState } from 'react';
// // import LoadingGif from '/img/storybook/loading.gif'
// // import { fetchRandomCard } from '../../../Api/api';
// // import Card from '../../../Components/Home/Common/Card'

// // Modal.setAppElement('#root');

// // const LoadingModal = ({ isOpen }) => {
// //   const [card, setCard] = useState(null);

// //   useEffect(() => {
// //     const randomCard = async () => {
// //       try {
// //         const Card = await fetchRandomCard(); // 랜덤 카드 데이터 가져오기
// //         setCard(Card); // 상태에 카드 데이터 설정
// //       } catch (error) {
// //         console.error('랜덤 카드를 가져오는 중 오류 발생:', error);
// //       }
// //     };

// //     if (isOpen) { // 모달이 열릴 때만 데이터를 가져옴
// //       randomCard();
// //     }

// //     console.log('LoadingModal isOpen:', isOpen); // isOpen 상태를 콘솔에 출력
// //   }, [isOpen]); // isOpen이 변경될 때마다 실행

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       contentLabel="Loading"
// //       className="loading-modal"
// //       overlayClassName="loading-overlay"
// //     >
// //       <div className="loading-content">
// //         <h2>로딩 중...</h2>
// //         <img src={LoadingGif} alt="" />
// //         <Card card={card} />
// //         {/* 여기에 로딩 스피너 추가 가능 */}
// //       </div>
// //     </Modal>
// //   );
// // };

// // LoadingModal.propTypes = {
// //   isOpen: PropTypes.bool.isRequired // isOpen의 타입과 필수 여부 명시
// // };

// // export default LoadingModal;


// import Modal from 'react-modal';
// import './css/LoadingModal.css';
// import PropTypes from 'prop-types'; 
// import { useEffect, useState } from 'react';
// import LoadingGif from '/img/storybook/loading.gif';
// import { fetchRandomCard } from '../../../Api/api';
// import Card from '../../../Components/Home/Common/Card'

// Modal.setAppElement('#root');

// const LoadingModal = ({ isOpen, message, onRequestClose }) => {
//   const [card, setCard] = useState(null);

//   useEffect(() => {
//         const randomCard = async () => {
//           try {
//             const Card = await fetchRandomCard(); // 랜덤 카드 데이터 가져오기
//             setCard(Card); // 상태에 카드 데이터 설정
//           } catch (error) {
//             console.error('랜덤 카드를 가져오는 중 오류 발생:', error);
//           }
//         };
    
//         if (isOpen) { // 모달이 열릴 때만 데이터를 가져옴
//           randomCard();
//         }
    
//         console.log('LoadingModal isOpen:', isOpen); // isOpen 상태를 콘솔에 출력
//       }, [isOpen]); 

//   return (
//     <Modal
//       isOpen={isOpen}
//       contentLabel="Loading"
//       className="loading-modal"
//       overlayClassName="loading-overlay"
//       onRequestClose={onRequestClose} // 모달이 닫힐 때 호출될 함수
//     >
//       <div className="loading-content">
//         <button onClick={onRequestClose} className="modal-close-btn">동화 보러 가기</button> {/* x 버튼 추가 */}
//         {message ? (
//           <div>
//             <h2>{message}</h2>
//             <Card card={card} />
//             </div>
//         ) : (
//           <div>
//             <h2>동그리가 열심히 동화를 만드는 중입니다</h2>
//             <h2>다른 친구의 동화도 구경해보세요!</h2>
//             <img src={LoadingGif} alt="로딩 중" />
//             <Card card={card} />
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// LoadingModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired, // isOpen의 타입과 필수 여부 명시
//   message: PropTypes.string, // 메시지를 표시할 문자열 타입
//   onRequestClose: PropTypes.func.isRequired, // 모달 닫기 함수
// };

// export default LoadingModal;


import Modal from 'react-modal';
import './css/LoadingModal.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import LoadingGif from '/img/storybook/loading.gif';
import { fetchRandomCard } from '../../../Api/api';
import Card from '../../../Components/Home/Common/Card';

Modal.setAppElement('#root');

const LoadingModal = ({ isOpen, message, onRequestClose }) => {
  const [card, setCard] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const randomCard = async () => {
      try {
        const fetchedCard = await fetchRandomCard(); // 랜덤 카드 데이터 가져오기
        setCard(fetchedCard); // 상태에 카드 데이터 설정
        setLoadingComplete(true); // 로딩 완료 상태로 설정
      } catch (error) {
        console.error('랜덤 카드를 가져오는 중 오류 발생:', error);
      }
    };

    if (isOpen) { // 모달이 열릴 때만 데이터를 가져옴
      randomCard();
    }

    console.log('LoadingModal isOpen:', isOpen); // isOpen 상태를 콘솔에 출력
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Loading"
      className="loading-modal"
      overlayClassName="loading-overlay"
      onRequestClose={onRequestClose} // 모달이 닫힐 때 호출될 함수
    >
      <div className="loading-content">
        <div className="content-left">
          <Card card={card} />
        </div>
        <div className="content-right">
          {message ? (
            <div className='loading-text'>
              <h2>{message}</h2>

              <button onClick={onRequestClose} className="modal-close-btn">
                동화 보러 가기
              </button>
            </div>
          ) : (
            <div className='loading-making-text'>
              <h2>동그리가 열심히 동화를 만드는 중입니다</h2>
              <h2>다른 친구의 동화도 구경해보세요!</h2>
              <img src={LoadingGif} alt="로딩 중" />
            </div>
          )}
          {/* {loadingComplete && (
            <button onClick={onRequestClose} className="modal-close-btn">
              동화 보러 가기
            </button>
          )} */}
        </div>
      </div>
    </Modal>
  );
};

LoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen의 타입과 필수 여부 명시
  message: PropTypes.string, // 메시지를 표시할 문자열 타입
  onRequestClose: PropTypes.func.isRequired, // 모달 닫기 함수
};

export default LoadingModal;
