import { useState, useRef } from 'react';
import './css/SnsDetail.css';
import Card from '../Common/Card';
import Community from './Community';

// eslint-disable-next-line react/prop-types
function SnsDetail({ num, toggleModal }) {
  const [emojiCounts, setEmojiCounts] = useState([0, 0, 0, 0]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comments, setComments] = useState([]);
  const modalRef = useRef(null);

  const handleEmojiClick = (index) => {
    let newCounts = emojiCounts.map((count, i) => {
      if (i === index) {
        return selectedEmoji === i ? count - 1 : count + 1;
      } else if (i === selectedEmoji) {
        return count - 1;
      }
      return count;
    });

    setSelectedEmoji(selectedEmoji === index ? null : index);
    setEmojiCounts(newCounts);

    fetch("https://api/updateEmojiCounts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emojiCounts: newCounts })
    })
    .then(response => response.json())
    .then(data => console.log("DB Updated: ", data))
    .catch(error => console.error('Error updating emoji counts:', error));
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
                imageSrc="/path/to/image.png"
                content={`미니카드 ${num}번의 상세 내용`}
                tags={["미니카드", `${num}번`]}
              />
              <Community
                profileImg="/path/to/profile.png"
                nickname="핫겸"
                date="2024-07-29"
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
