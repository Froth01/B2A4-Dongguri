import { useState } from 'react';
import PropTypes from 'prop-types'
import './css/CommentItem.css'

const CommentItem = ({ comment, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);
    const [showActions, setShowActions] = useState(false); // 액션 메뉴를 표시할지 여부

    const handleEdit = () => {
        setIsEditing(true);
        setShowActions(false); // 편집을 시작하면 액션 메뉴 숨기기
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(comment.content); // 원래 내용으로 리셋
    };

    const handleSave = () => {
        onUpdate(comment.commentId, editText); // 부모 컴포넌트의 업데이트 함수 호출
        setIsEditing(false);
    };

    const handleReport = () => {
        // 신고하기 전에 사용자에게 확인
        if (window.confirm("이 댓글을 신고하시겠습니까?")) {
        }
        setShowActions(false); // 신고 후 액션 메뉴 숨기기
    };

    const toggleActions = () => {
        setShowActions(!showActions); // 액션 메뉴 표시/숨김 토글
    };

    return (
        <div className="comment-item">
            <div className='comment-profile-img-container'>
                <img src={comment.profileImgUrl} alt="Profile" className="comment-profile-img" />
            </div>
            <div className='comment-topic'>
                <div className="comment-header">
                    <div className="comment-user-id">{comment.userId}</div>
                    <div className="comment-date">{new Date(comment.createdDate).toLocaleDateString()}</div>
                </div>
                <div className='comment-main'>
                    {isEditing ? (
                        <div className='comment-edit-container'>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="comment-edit-input"
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
        userId: PropTypes.number.isRequired,
        profileImgUrl: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        commentId: PropTypes.number.isRequired,
        isMine: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default CommentItem;