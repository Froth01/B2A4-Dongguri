import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { removeStorybook } from '../../../slices/storyBookSlice';
import PropTypes from 'prop-types';
import './css/Community.css';
import cool from '/img/sns/cool.png';
import fun from '/img/sns/fun.png';
import good from '/img/sns/good.png';
import like from '/img/sns/like.png';
import CommentItem from './CommentItem';
import Reports from '../Common/Reports';
import ShareButton from '../Common/ShareButton';
import {selectFUN,selectHAPPY, selectSAD, selectJOY,
     setFUN, setHAPPY, setSAD, setJOY,
     likeStorybookThunk, unlikeStorybookThunk, getStorybookReactionsThunk } from '../../../slices/reactionsSlice';
import { getCommentsThunk, addCommentThunk, updateCommentThunk, deleteCommentThunk, selectComments } from '../../../slices/commentSlice';

const Community = ({ card }) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    
    // const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isReportOpen, setIsReportOpen] = useState(false); 

    // 공감하기
    const funReaction = useSelector(selectFUN);
    const happyReaction = useSelector(selectHAPPY);
    const sadReaction = useSelector(selectSAD);
    const joyReaction = useSelector(selectJOY);

    // 공감 조회수
    useEffect(() => {
        dispatch(getStorybookReactionsThunk({ storybookId: card.storybookId }));
        dispatch(getCommentsThunk(card.storybookId));
    }, [dispatch, card.storybookId]);

    // 공감 상태
    const emojis = [
        { img: cool, alt: 'FUN', reaction: funReaction, setReaction: setFUN },
        { img: fun, alt: 'HAPPY', reaction: happyReaction, setReaction: setHAPPY },
        { img: good, alt: 'SAD', reaction: sadReaction, setReaction: setSAD },
        { img: like, alt: 'JOY', reaction: joyReaction, setReaction: setJOY }
    ];

    const handleEmojiClick = async (index) => {
        const selectedEmoji = emojis[index];
        const currentReaction = selectedEmoji.reaction;
        const storybookId = card.storybookId;
        const reactionType = selectedEmoji.alt.toUpperCase(); // 이모지의 alt 값을 reactionType으로 사용

        // 공감 API 호출
        console.log('emojis[index]',emojis[index])
        console.log('현재정보',currentReaction)
        if (currentReaction.nowState) {
            console.log('취소',storybookId, reactionType)
            await dispatch(unlikeStorybookThunk({ storybookId, reactionType }));

        } else {
            await dispatch(likeStorybookThunk({ storybookId, reactionType }));
        }

        // 상태 업데이트
        const updatedState = await dispatch(getStorybookReactionsThunk({ storybookId })).unwrap();
        console.log('업데이트된 상태:', updatedState[reactionType]);
    };

    const onUpdateComment = (commentId, newText) => {
        dispatch(updateCommentThunk({ commentId, content: newText }));
    };
    
    const onDeleteComment = (commentId) => {
        dispatch(deleteCommentThunk(commentId));
    };

    const onCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const onCommentSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim()) {
            dispatch(addCommentThunk({ storybookId: card.storybookId, content: commentText }));
            setCommentText('');
        }
    };

    const handleDeleteClick = async () => {
        // 사용자에게 삭제 확인 요청
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await dispatch(removeStorybook(card.storybookId));
                window.location.reload(); // 삭제 후 페이지 새로고침
            } catch (error) {
                console.error("Failed to delete storybook:", error);
            }
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    };

    return (
        <div className="community-container">
            <div className="profile-section">
                <div className='profile-image-container'>
                    <img src={card.profileImgUrl} alt="Profile" className="profile-image" />
                </div>
                <div className="author">{card.author}</div>
                <div className="date">{new Date(card.createdDate).toLocaleDateString()}</div>
                <div className="action-button">
                    <ShareButton card={card} />
                {/* <button className="share-button" onClick={() => handleShareClick(card.storybookId)}>공유하기</button> */}
                    {!card.isMine && (
                        <button className="report-button" onClick={() => setIsReportOpen(true)}>신고하기</button>
                    )}
                    {card.isMine && (
                        <button className="delete-button" onClick={() => handleDeleteClick(card.storybookId)}>삭제하기</button>
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

            {/* 공감하기 */}
            {/* <Reaction storybookId={card.storybookId}/> */}
            <div className="emojis-section">
                {emojis.map((emoji, index) => (
                    <div key={index} className="emoji" onClick={() => handleEmojiClick(index)}>
                        <img src={emoji.img} alt={emoji.alt} />
                        <p>{emoji.reaction.count}</p>
                    </div>
                ))}
            </div>
            

            {/* 신고하기 버튼 클릭시 신고 모달뜸 */}
            {isReportOpen && (
                <Reports
                contentId={card.storybookId}
                contentType="STORYBOOK"
                onRequestClose={() => setIsReportOpen(false)}
                />
             )}
      
        </div>
    );
};

Community.propTypes = {
    card: PropTypes.shape({
      storybookId: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      profileImgUrl: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdDate: PropTypes.string.isRequired,
    }).isRequired,
  };

export default Community;