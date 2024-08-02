/* eslint-disable react/prop-types */
import './css/Card.css';
import hachiwareImage from '/img/sns/sample/hachiware.jpg';

const Card = ({ content, tags }) => {
  if (!tags || !Array.isArray(tags)) {
    return <div>No tags available</div>;
  }

  return (
    <div className="card-container">
      <img src={hachiwareImage} alt="예시 이미지" className="card-image" />
      <div className="card-story">
        <p className="card-storyline">{content}</p>
        <div className="card-tag-list">
          <div className="tags">
            {tags.map((tag, index) => <span key={index}>#{tag} </span>)}
          </div>
          <button className="card-record-listen">녹음듣기</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

