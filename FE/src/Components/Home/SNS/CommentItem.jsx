import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import './css/CommentItem.css'

const CommentItem = ({ comment, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);
    const [showActions, setShowActions] = useState(false);

   // 댓글 수정 시작
   const handleEdit = () => {
        setIsEditing(true);
        setShowActions(false);
    };

    // 댓글 수정 취소
    const handleCancel = () => {
        setIsEditing(false);
        setEditText(comment.content);
    };

    // 댓글 수정 저장
    const handleSave = () => {
        if (editText.trim() === '') {
            alert("내용을 입력하세요.");
            return;
        }
        onUpdate(comment.commentId, editText);
        setIsEditing(false);
    };

    // 댓글 신고
    const handleReport = () => {
        if (window.confirm("이 댓글을 신고하시겠습니까?")) {
            //신고처리 로직
        }
        setShowActions(false);
    };

    const toggleActions = () => {
        setShowActions(!showActions);
    };

    // 수정창
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [editText]);

    return (
        <div className="comment-item">
            <div className='comment-profile-img-container'>
                <img src={comment.profileImageUrl} alt="Profile" className="comment-profile-img" />
            </div>
            <div className='comment-topic'>
                <div className="comment-header">
                    <div className="comment-user-id">{comment.nickname}</div>
                    <div className="comment-date">{new Date(comment.created).toLocaleDateString()}</div>
                </div>
                <div className='comment-main'>
                    {isEditing ? (
                        <div className='comment-edit-container'>
                            <textarea
                                ref={textareaRef}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="comment-edit-textarea"
                                rows={1}
                            />
                            <div className='comment-edit-btn'>
                                <button onClick={handleSave}>저장</button>
                                <button onClick={handleCancel}>취소</button>
                            </div>
                        </div>
                    ) : (
                        <div className="comment-content">
                            {comment.content}
                        </div>
                    )}
                    {!isEditing && (
                        <div className="comment-actions">
                            <img src="/img/sns/dot-menu.png"
                                alt="comment-menu"
                                className='comment-menu'
                                onClick={toggleActions} />
                            {showActions && (
                                <div className="actions-menu">
                                    {comment.isMine ? (
                                        <>
                                            <button onClick={handleEdit}>댓글 수정</button>
                                            <hr />
                                            <button onClick={() => onDelete(comment.commentId)}>댓글 삭제</button>
                                        </>
                                    ) : (
                                        <button className='report-btn' onClick={handleReport}>신고</button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        profileImageUrl: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        commentId: PropTypes.number.isRequired,
        isMine: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default CommentItem;