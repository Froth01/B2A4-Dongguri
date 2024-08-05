import React, { useState, useEffect } from 'react';
import './css/Community.css';
import cool from '/img/sns/cool.png';
import fun from '/img/sns/fun.png';
import good from '/img/sns/good.png';
import like from '/img/sns/like.png';
import CommentItem from './CommentItem';

const dummyComments = [
    { userId: 1, commentId: 1, storybookId: 1, content: "정말 감동적이고 멋있는 이야기지요?", isMine: true, createdDate: "2024-07-01", modifiedDate: null },
    { userId: 1, commentId: 2, storybookId: 2, content: "너무 슬퍼요ㅠㅠ", isMine: true, createdDate: "2024-07-02", modifiedDate: null },
    { userId: 1, commentId: 3, storybookId: 3, content: "매우 기특한 이야기네요~~", isMine: true, createdDate: "2024-07-04", modifiedDate: null },
    { userId: 1, commentId: 4, storybookId: 4, content: "이게 바로 진정한 용기의 모습이죠!", isMine: true, createdDate: "2024-07-05", modifiedDate: null },
    { userId: 2, commentId: 2, storybookId: 1, content: "재미있어요! 또 듣고 싶어요!", isMine: false, createdDate: "2024-07-06", modifiedDate: null },
    { userId: 2, commentId: 3, storybookId: 2, content: "완전 힐링되는 이야기였습니다!", isMine: false, createdDate: "2024-07-07", modifiedDate: null },
    { userId: 2, commentId: 4, storybookId: 3, content: "아이들에게 들려주고 싶네요.", isMine: false, createdDate: "2024-07-08", modifiedDate: null },
    { userId: 2, commentId: 1, storybookId: 4, content: "이런 경험 한번쯤은 해보고 싶어요.", isMine: false, createdDate: "2024-07-09", modifiedDate: null },
    { userId: 3, commentId: 3, storybookId: 1, content: "눈물이 앞을 가리네요...", isMine: false, createdDate: "2024-07-10", modifiedDate: null },
    { userId: 3, commentId: 4, storybookId: 2, content: "재미있고 유익한 시간이었어요!", isMine: false, createdDate: "2024-07-11", modifiedDate: null },
    { userId: 3, commentId: 1, storybookId: 3, content: "다음 이야기가 기대돼요!", isMine: false, createdDate: "2024-07-12", modifiedDate: null },
    { userId: 3, commentId: 2, storybookId: 4, content: "모든 감정이 느껴지는 이야기였습니다.", isMine: false, createdDate: "2024-07-13", modifiedDate: null },
    { userId: 4, commentId: 4, storybookId: 1, content: "영감을 받았어요, 감사합니다!", isMine: false, createdDate: "2024-07-14", modifiedDate: null },
    { userId: 4, commentId: 1, storybookId: 2, content: "더 많은 이야기를 기대하고 있겠습니다.", isMine: false, createdDate: "2024-07-15", modifiedDate: null },
    { userId: 4, commentId: 2, storybookId: 3, content: "가슴이 따뜻해지는 이야기였어요.", isMine: false, createdDate: "2024-07-16", modifiedDate: null },
    { userId: 4, commentId: 3, storybookId: 4, content: "이런 종류의 이야기를 더 많이 듣고 싶어요.", isMine: false, createdDate: "2024-07-17", modifiedDate: null }
];

const Community = ({ dummyList, cardId, emojiCounts, handleEmojiClick }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    // Find card data using cardId
    const cardData = dummyList.find(card => card.id === cardId);


    const emojis = [
        { img: cool, alt: 'Cool', count: emojiCounts[0] },
        { img: fun, alt: 'Fun', count: emojiCounts[1] },
        { img: good, alt: 'Good', count: emojiCounts[2] },
        { img: like, alt: 'Like', count: emojiCounts[3] }
    ];

    // On component mount, filter comments for this storybook
    useEffect(() => {
        const filteredComments = dummyComments
            .filter(comment => comment.storybookId === cardId)
            .sort((a, b) => a.commentId - b.commentId);
        setComments(filteredComments);
    }, [cardId]);

    const onUpdateComment = (commentId, newText) => {
        const updatedComments = comments.map(comment =>
            comment.commentId === commentId ? { ...comment, content: newText, modifiedDate: new Date().toISOString() } : comment
        );
        setComments(updatedComments);
    };
    
    const onDeleteComment = (commentId) => {
        const updatedComments = comments.filter(comment => comment.commentId !== commentId);
        setComments(updatedComments);
    };

    const onCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const onCommentSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                storybookId: cardId, // Ensure new comments are associated with the current storybook
                text: commentText,
                isMine: true // This should depend on user authentication logic
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    return (
        <div className="community-container">
            <div className="profile-section">
                <div className='profile-image-container'>
                    <img src={cardData.profileImgUrl} alt="Profile" className="profile-image" />
                </div>
                <div className="author">{cardData.author}</div>
                <div className="date">{new Date(cardData.createdDate).toLocaleDateString()}</div>
                <div className="action-button">
                    <button className="share-button">공유하기</button>
                    {!cardData.isMine && (
                        <button className="report-button">신고하기</button>
                    )}
                </div>
            </div>
            <div className="comments-section">
                <div className="comment-input-container">
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
                </div>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.commentId}
                            comment={comment}
                            onUpdate={onUpdateComment}
                            onDelete={onDeleteComment}
                        />
                    ))}
                </div>
            </div>
            <div className="emojis-section">
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
