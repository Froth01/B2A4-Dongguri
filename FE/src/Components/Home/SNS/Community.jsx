import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
     likeStorybookThunk, unlikeStorybookThunk, getStorybookReactionsThunk } from '../../../slices/reactionsSlice'
import { fetchSearchResultsThunk, selectKeyword} from '../../../slices/searchSlice'

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

const Community = ({ card }) => {
    console.log('커뮤니티 card',card)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
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

    // 공감 조회수
    useEffect(() => {
        dispatch(getStorybookReactionsThunk({ storybookId: card.storybookId }));
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

    // On component mount, filter comments for this storybook
    useEffect(() => {
        const filteredComments = dummyComments
            .filter(comment => comment.storybookId === card.storybookId)
            .sort((a, b) => a.commentId - b.commentId);
        setComments(filteredComments);
    }, [card.storybookId]);

    const onUpdateComment = (commentId, newText) => {
        const updatedComments = comments.map((comment) => {
            if (comment.commentId === commentId) {
              comment = { ...comment, content: newText, modifiedDate: new Date().toISOString() }
            }
            });
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
                commentId: comments.length + 1, // `id` 대신 `commentId`를 사용
                storybookId: card.storybookId, // 현재 스토리북 ID
                content: commentText, // 댓글 내용
                isMine: true, // 사용자 인증 로직에 따라 변경될 수 있음
                createdDate: new Date().toISOString(), // 댓글 생성 날짜
                modifiedDate: null // 수정 날짜는 초기에 null
            };
            setComments([...comments, newComment]); // 댓글 리스트에 새 댓글 추가
            setCommentText(''); // 입력 필드 초기화
        }
    };

    // const handleShareClick = (storybookId) => { // 공유하기 -> url이 콘솔에 나옴
    //     console.log(`http://localhost:5173/storybooks/${storybookId}`);
    // };

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

    return (
        <div className="community-container">
            <div className="profile-section">
                <div className='profile-image-container'>
                    <img src={card.profileImageUrl} alt="Profile" className="profile-image" />
                </div>
                <div className="author">{card.nickname}</div>
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
    card: PropTypes.object
  };

export default Community;