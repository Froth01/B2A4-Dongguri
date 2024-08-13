// import { useRef, useEffect, useState } from 'react';
// import { useParams,useLocation,useNavigate  } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Card from '../Common/Card';
// import Community from './Community';
// import './css/SnsDetail.css';
// import { getStorybook } from '../../../Api/api';

// // function SnsDetail({ card, toggleModal }) {
// function SnsDetail({ toggleModal }) {
//   const modalRef = useRef(null);
//   const { storybookId } = useParams();  // URL에서 storybookId를 가져옴
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const card = location.state?.card;
//   const [card, setCard] = useState(location.state?.card || null); 
//   console.log('카드',card)
//   console.log('url에서 데이터 잘 뽑았냐',storybookId)
  
//   useEffect(() => {
//     // 카카오톡 공유하기떔에 일단 api에서 데이터 가져와봄..
//     const fetchCardData = async () => {
//       try {
//         const fetchedCard = await getStorybook(storybookId); // API 호출
//         setCard(fetchedCard);  // 서버에서 가져온 데이터로 card 상태 업데이트
//       } catch (error) {
//         console.error("서버에서 데이터를 가져오는 중 오류 발생:", error);
//       }
//     };

//     // location.state에 카드 데이터가 없으면 API 호출
//     // if (!location.state?.card) {
//     //   fetchCardData();
//     // }
//     if (!card) {
//       fetchCardData();
//     }
//   }, [storybookId, card]);
//   // }, [storybookId, location.state]);

//   const handleCloseClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       navigate('/sns')
//       toggleModal();
//     }
//   };

//   return (
//     <div className="sns-detail">
//       <div className="modal-container">
//         <div className="modal-backdrop" onClick={handleCloseClick}>
//           <div className="modal-content" ref={modalRef}>
//             {/* <button className="close-button" onClick={toggleModal}>✕</button> */}
//             <button className="close-button" onClick={() => navigate('/sns')}>✕</button>
//             <div className="modal-body">
//               <Card 
//                 card={card}
//                 handleCardClick={() => {}}
//               />
//               <Community
//                 card={card}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// SnsDetail.propTypes = {
//   card: PropTypes.object,
//   toggleModal: PropTypes.func.isRequired,
// };

// export default SnsDetail;


import { useRef, useEffect, useState } from 'react';
import { useParams,useLocation,useNavigate  } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../Common/Card';
import Community from './Community';
import './css/SnsDetail.css';
import { getStorybook } from '../../../Api/api';

// function SnsDetail({ card, toggleModal }) {
function SnsDetail({ toggleModal }) {
  const modalRef = useRef(null);
  const { storybookId } = useParams();  // URL에서 storybookId를 가져옴
  const location = useLocation();
  const navigate = useNavigate();
  // const card = location.state?.card;
  const [card, setCard] = useState(location.state?.card || null); 
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  console.log('카드',card)
  console.log('url에서 데이터 잘 뽑았냐',storybookId)
  
 useEffect(() => {
    const fetchCardData = async () => {
      try {
        const fetchedCard = await getStorybook(storybookId); // API 호출
        setCard(fetchedCard.data);  // 받아온 데이터를 card 상태로 설정
      } catch (error) {
        console.error("서버에서 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);  // 로딩 완료
      }
    };

    // location.state에 카드 데이터가 없으면 API 호출
    // if (!location.state?.card) {
    //   fetchCardData();
    // }
    if (!card) {
      fetchCardData();
    } else {
      setLoading(false); // 이미 card가 있으면 로딩 완료 상태로 설정
    }
  }, [storybookId, card]);
  // }, [storybookId, location.state]);

  const handleCloseClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate('/sns')
      if (toggleModal) {
        toggleModal();
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 표시
  }

  if (!card) {
    return <div>카드를 불러올 수 없습니다.</div>;  // card가 null일 경우
  }
  
  return (
    <div className="sns-detail">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={handleCloseClick}>
          <div className="modal-content" ref={modalRef}>
            {/* <button className="close-button" onClick={toggleModal}>✕</button> */}
            <button className="close-button" onClick={() => navigate('/sns')}>✕</button>
            <div className="modal-body">
              <Card 
                card={card}
                handleCardClick={() => {}}
              />
              <Community
                card={card}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SnsDetail.propTypes = {
  card: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
};

export default SnsDetail;



// import { useRef, useEffect, useState } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Card from '../Common/Card';
// import Community from './Community';
// import './css/SnsDetail.css';
// import { getStorybook } from '../../../Api/api';

// function SnsDetail({ isModal = false, toggleModal }) {
//   const modalRef = useRef(null);
//   const { storybookId } = useParams();  // URL에서 storybookId를 가져옴
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [card, setCard] = useState(location.state?.card || null);
//   const [loading, setLoading] = useState(true);  // 로딩 상태 추가

//   useEffect(() => {
//     const fetchCardData = async () => {
//       try {
//         const fetchedCard = await getStorybook(storybookId); // API 호출
//         setCard(fetchedCard);  // 받아온 데이터를 card 상태로 설정
//       } catch (error) {
//         console.error("서버에서 데이터를 가져오는 중 오류 발생:", error);
//       } finally {
//         setLoading(false);  // 로딩 완료
//       }
//     };

//     if (!card) {
//       fetchCardData();
//     } else {
//       setLoading(false); // 이미 card가 있으면 로딩 완료 상태로 설정
//     }
//   }, [storybookId, card]);

//   const handleCloseClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       navigate('/sns');
//       if (toggleModal) {
//         toggleModal();
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;  // 로딩 중일 때 표시
//   }

//   if (!card) {
//     return <div>카드를 불러올 수 없습니다.</div>;  // card가 null일 경우
//   }

//   return (
//     <div className={isModal ? "sns-detail-modal" : "sns-detail"}>
//       {isModal ? (
//         <div className="modal-container">
//           <div className="modal-backdrop" onClick={handleCloseClick}>
//             <div className="modal-content" ref={modalRef}>
//               <button className="close-button" onClick={() => navigate('/sns')}>✕</button>
//               <div className="modal-body">
//                 <Card card={card} handleCardClick={() => {}} />
//                 <Community card={card} />
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="page-container">
//           <button className="back-button" onClick={() => navigate('/sns')}>Back</button>
//           <div className="page-content">
//             <Card card={card} handleCardClick={() => {}} />
//             <Community card={card} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// SnsDetail.propTypes = {
//   isModal: PropTypes.bool,
//   toggleModal: PropTypes.func,
// };

// export default SnsDetail;
