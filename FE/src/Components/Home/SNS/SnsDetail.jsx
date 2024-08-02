import { useState, useRef } from 'react';
import './css/SnsDetail.css';
import Card from '../Common/Card';
import Community from './Community';

function SnsDetail({ card, toggleModal, dummyList }) {
  const [emojiCounts, setEmojiCounts] = useState([0, 0, 0, 0]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comments, setComments] = useState([]);
  const modalRef = useRef(null);

  const handleEmojiClick = (index) => {
    let newCounts = emojiCounts.slice();

    const updatedSelectedEmojis = new Set(selectedEmoji)  ;
    
    if (updatedSelectedEmojis.has(index)) {
      updatedSelectedEmojis.delete(index);
      newCounts[index] -= 1;
    } else {
      updatedSelectedEmojis.add(index);
      newCounts[index] += 1;
    }
  
    setSelectedEmoji(updatedSelectedEmojis);
    setEmojiCounts(newCounts);
  };
  

  const handleAddComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const handleCloseClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      toggleModal();
    }
  };

  return (
    <div className="sns-detail">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={handleCloseClick}>
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={toggleModal}>✕</button>
            <div className="modal-body">
              <Card 
                card={card}
                handleCardClick={() => {}}
              />
              <Community
                dummyList={dummyList}
                storybookId={card.storybookId} // 카드의 storybookId를 Community로 전달
                comments={comments}
                handleAddComment={handleAddComment}
                emojiCounts={emojiCounts}
                handleEmojiClick={handleEmojiClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnsDetail;