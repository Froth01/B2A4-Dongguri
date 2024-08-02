import { useState } from 'react';
import MiniCard from './MiniCard';
import SnsDetail from '../SNS/SnsDetail';
import './css/MiniCardList.css';

function MiniCardList() {
  const dummyList = ['1', '2', '3', '4', '5', '6', '7'];
  const [selectedNum, setSelectedNum] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (num) => {
    setSelectedNum(num);
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='minicardlist'>
      {dummyList.map((num, index) => (
        <MiniCard 
          key={index} 
          num={num} 
          handleCardClick={handleCardClick}
        />
      ))}
      {modalOpen && (
        <SnsDetail 
          num={selectedNum}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default MiniCardList;
