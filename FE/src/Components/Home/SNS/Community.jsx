/* eslint-disable react/prop-types */
import { useState } from 'react';
import './css/SnsDetail.css';
import cool from '../../../../public/img/sns/cool.png';
import fun from '../../../../public/img/sns/fun.png';
import good from '../../../../public/img/sns/good.png';
import like from '../../../../public/img/sns/like.png';
import chiikawaImage from '../../../../public/img/sns/sample/chiikawa.jpg'
import CommentItem from './CommentItem';

const Community = ({ nickname, date, initialComments, emojiCounts, handleEmojiClick }) => {
    const [comments, setComments] = useState(initialComments || []); // 초기 댓글을 props로 받고, 없으면 빈 배열로 초기화
    const [commentText, setCommentText] = useState('');

    const onCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const onCommentSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };

    const handleUpdateComment = (index) => {
        const updatedComment = prompt('댓글 수정:', comments[index]);
        if (updatedComment && updatedComment !== comments[index]) {
            const updatedComments = comments.map((comment, idx) => idx === index ? updatedComment : comment);
            setComments(updatedComments);
        }
    };

    const handleDeleteComment = (index) => {
        const filteredComments = comments.filter((_, idx) => idx !== index);
        setComments(filteredComments);
    };

    const emojis = [
        { img: cool, alt: 'cool', count: emojiCounts[0] },
        { img: fun, alt: 'fun', count: emojiCounts[1] },
        { img: good, alt: 'good', count: emojiCounts[2] },
        { img: like, alt: 'like', count: emojiCounts[3] }
    ];

    return (
        <div className="community-container">
            <div className="profile-section">
                <img src={chiikawaImage} alt="예시 프로필" className="profile-image" />
                <div className="nickname">{nickname}</div>
                <div className="date">{date}</div>
                <button className="share-button">공유하기</button>
            </div>
            <div className="sns-comments">
                <form onSubmit={onCommentSubmit}>
                    <input
                        type="text"
                        placeholder="댓글을 입력해주세요"
                        value={commentText}
                        onChange={onCommentChange}
                        className="comment-input"
                    />
                    <button type="submit" className="submit-comment-button">댓글쓰기</button>
                </form>
                {comments.map((comment, index) => (
                    <CommentItem key={index} text={comment} onUpdate={() => handleUpdateComment(index)} onDelete={() => handleDeleteComment(index)} />
                ))}
            </div>
            <div className="emojis">
                {emojis.map((emoji, index) => (
                    <div key={index} className="emoji" onClick={() => handleEmojiClick(index)}>
                        <img src={emoji.img} alt={emoji.alt} />
                        <p>{emoji.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
