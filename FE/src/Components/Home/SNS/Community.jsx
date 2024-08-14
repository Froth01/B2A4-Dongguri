import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeStorybook } from '../../../slices/storyBookSlice';
import PropTypes from 'prop-types';
import './css/Community.css';
// 이미지 import
import FUN from '/img/sns/FUN.png';
import HAPPY from '/img/sns/HAPPY.png';
import JOY from '/img/sns/JOY.png';
import SAD from '/img/sns/SAD.png';
import Report from '/img/sns/Report.png'
import Share from '/img/sns/Share.png'
import Delete from '/img/sns/Delete.png'
import CommentItem from './CommentItem';
import Reports from '../Common/Reports';
import ShareButton from '../Common/ShareButton';
import {selectFUN,selectHAPPY, selectSAD, selectJOY,
     setFUN, setHAPPY, setSAD, setJOY,
     likeStorybookThunk, unlikeStorybookThunk, getStorybookReactionsThunk } from '../../../slices/reactionsSlice';
import { getCommentsThunk, addCommentThunk, updateCommentThunk, deleteCommentThunk, selectComments } from '../../../slices/commentSlice';
import { fetchSearchResultsThunk, selectKeyword} from '../../../slices/searchSlice'


const Community = ({ card }) => {
    console.log('커뮤니티 card',card)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comments = useSelector(selectComments);
    
    const [commentText, setCommentText] = useState('');
    const [isReportOpen, setIsReportOpen] = useState(false); 

    const keyword = useSelector(selectKeyword);
    const page = 0
    
    useEffect(() => {
        if (!card) {
            navigate('/sns');
        }
        // return null
    }, [card, navigate]);

    if (!card) {
        return null; // card가 없는 경우 아무것도 렌더링하지 않음
    }

    // 공감하기
    const funReaction = useSelector(selectFUN);
    const happyReaction = useSelector(selectHAPPY);
    const sadReaction = useSelector(selectSAD);
    const joyReaction = useSelector(selectJOY);

    // 공감 조회수, 댓글
    useEffect(() => {
        dispatch(getStorybookReactionsThunk({ storybookId: card.storybookId }));
        dispatch(getCommentsThunk({ storybookId: card.storybookId, page: 0 }))
    }, [dispatch, card.storybookId]);

    // storybookId에 맞게 댓글 필터
    const filteredComments = comments.filter(comment => comment.storybookId === card.storybookId);
 
    // 공감 상태
    const emojis = [
        { img: FUN, alt: 'FUN', text:'기뻐요', reaction: funReaction, setReaction: setFUN },
        { img: HAPPY, alt: 'HAPPY',text:'행복해요', reaction: happyReaction, setReaction: setHAPPY },
        { img: SAD, alt: 'SAD', text:'슬퍼요',reaction: sadReaction, setReaction: setSAD },
        { img: JOY, alt: 'JOY', text:'즐거워요',reaction: joyReaction, setReaction: setJOY }
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
            const data = {storybookId, reactionType}
            console.log('취소',data)
            await dispatch(unlikeStorybookThunk(data));
            // await dispatch(unlikeStorybookThunk({ storybookId, reactionType }));

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
        // 사용자에게 삭제 확인 요
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                console.log('동화id',card.storybookId)
                await dispatch(removeStorybook({ storybookId: card.storybookId }));
                // window.location.reload(); // 삭제 후 페이지 새로고침

                navigate('/sns')
                dispatch(fetchSearchResultsThunk({ keyword, page}))
            } catch (error) {
                console.error("Failed to delete storybook:", error);
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
                    <img src={card.profileImageUrl} alt="Profile" className="profile-image" />
                </div>
                <div className="author">{card.nickname}</div>
                <div className="date">{new Date(card.createdDate).toLocaleDateString()}</div>
                <div className="action-button">
                    {/* 공유하기 버튼 */}
                    <ShareButton card={card} />
                    {!card.isMine && (
                        <button className="report-button" onClick={() => setIsReportOpen(true)}>
                            <img src={Report} alt="" />
                        </button>
                    )}
                    {card.isMine && (
                        <button className="delete-button" onClick={() => handleDeleteClick(card.storybookId)}>
                            <img src={Delete} alt="" />
                        </button>
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
                        <p>{emoji.text}</p>
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
    card: PropTypes.object
  };

export default Community;