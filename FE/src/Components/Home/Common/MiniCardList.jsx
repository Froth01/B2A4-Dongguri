

import { useState,useEffect } from 'react';
import MiniCard from './MiniCard';
import SnsDetail from '../SNS/SnsDetail';
import './css/MiniCardList.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getCardListByUserId } from '../../../slices/cardListSlice';



// S11P12B309\FE\public\img\card\dummy1.png
function MiniCardList({cardList, onCardClick}) {
  const targetUser = useSelector(state => state.userInfo.object)
  const [cards, setCards] = useState(cardList)
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect (() => {
    setCards(cardList)
  },[cardList])

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
    if (onCardClick) {
      onCardClick(card);
    }
  };

  const toggleModal = () => {
    console.log('토글 열림')
    setModalOpen(!modalOpen);
  };


  // 모달 바로 닫히는지 테스트
  useEffect(() => {
    if (modalOpen) {
      console.log('Modal is opened');
    } else {
      console.log('Modal is closed');
    }
  }, [modalOpen]);

  const safeCardList = Array.isArray(cardList) ? cardList : [];

  // return (
  //   <div className='minicardlist'>
  //     {safeCardList.length === 0 && <p>검색 결과가 없습니다.</p>}
    
   // cardList가 배열인지 확인하고, 그렇지 않다면 빈 배열로 설정
   // const safeCardList = Array.isArray(cards) ? cards : [];

  return (
    <div className='minicardlist'>
      {safeCardList.length === 0 && <p>검색 결과가 없습니다.</p>}

      {safeCardList.map((card) => (
        <MiniCard 
          key={card.storybookId} 
          card={card} 
          handleCardClick={handleCardClick}
        />
      ))}
      {modalOpen && (
        <SnsDetail 
          card={selectedCard}
          isModal={true}  // 모달로 사용할 때는 isModal을 true로 설정
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

MiniCardList.propTypes = {
  cardList: PropTypes.array.isRequired,
  onCardClick: PropTypes.func,
  type: PropTypes.string.isRequired
}

export default MiniCardList;