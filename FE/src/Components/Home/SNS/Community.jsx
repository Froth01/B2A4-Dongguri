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
        dispatch(getCommentsThunk({ storybookId: card.storybookId, page: 0 }))
    }, [dispatch, card.storybookId]);

    // storybookId에 맞게 댓글 필터
    const filteredComments = comments.filter(comment => comment.storybookId === card.storybookId);
 
    // 공감 상태
    const emojis = [
        { img: cool, alt: 'FUN', reaction: funReaction, setReaction: setFUN },
        { img: fun, alt: 'HAPPY', reaction: happyReaction, setReaction: setHAPPY },
        { img: good, alt: 'SAD', reaction: sadReaction, setReaction: setSAD },
        { img: like, alt: 'JOY', reaction: joyReaction, setReaction: setJOY }
    ];

    // 공감 클릭
    const handleEmojiClick = async (index) => {
        const selectedEmoji = emojis[index];
        const currentReaction = selectedEmoji.reaction;
        const storybookId = card.storybookId;
        const reactionType = selectedEmoji.alt.toUpperCase();

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


    // 댓글 수정
    const onUpdateComment = (commentId, newText) => {
        if (window.confirm("댓글이 수정되었습니다. 페이지를 새로고침합니다.")) {
            dispatch(updateCommentThunk({ commentId, content: newText }));
            window.location.reload();
        }
    };
    
    // 댓글 삭제
    const onDeleteComment = (commentId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            dispatch(deleteCommentThunk(commentId))
                .then(() => {
                    alert("댓글이 삭제되었습니다. 페이지를 새로고침합니다.");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("댓글 삭제에 실패했습니다:", error);
                });
        } else {
            alert("삭제가 취소되었습니다.");
        }
    };

    // 현재 댓글 값
    const onCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    // 댓글 작성
    const onCommentSubmit = async (event) => {
        event.preventDefault();
        if (commentText.trim()) {
            try {
                await dispatch(addCommentThunk({ storybookId: card.storybookId, content: commentText })).unwrap();
                setCommentText('');
                dispatch(getCommentsThunk({ storybookId: card.storybookId, page: 0 }));
            } catch (error) {
                console.error("Failed to add comment:", error);
            }
        }
    };


    // 동화 삭제
    const handleDeleteClick = async () => {
        // 사용자에게 삭제 확인 요청
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await dispatch(removeStorybook(card.storybookId));
                alert("동화가 삭제되었습니다. 페이지를 새로고침합니다.");
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete storybook:", error);
                alert("동화 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    };

    // console로 댓글 리스트 확인
    useEffect(() => {
        console.log("Rendered comments:", filteredComments);
    }, [comments]);
    
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
                    {filteredComments.length > 0 ? (
                        filteredComments.map((comment) => (
                            <CommentItem
                                key={comment.commentId}
                                comment={comment}
                                onUpdate={onUpdateComment}
                                onDelete={onDeleteComment}
                            />
                        ))
                    ) : (
                        <p className='no-community-comment'>댓글이 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 공감하기 */}
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