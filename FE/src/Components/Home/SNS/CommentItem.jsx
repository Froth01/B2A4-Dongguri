import { useState } from 'react';
import PropTypes from 'prop-types'

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
            onReport(comment.commentId); // 신고 처리 함수 호출
        }
        setShowActions(false); // 신고 후 액션 메뉴 숨기기
    };

    const toggleActions = () => {
        setShowActions(!showActions); // 액션 메뉴 표시/숨김 토글
    };

    return (
        <div className="comment-item">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="comment-edit-input"
                    />
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleCancel}>취소</button>
                </div>
            ) : (
                <div className="comment-content">{comment.content}</div>
            )}
            {!isEditing && (
                <div className="comment-actions">
                    <button onClick={toggleActions}>...</button>
                    {showActions && (
                        <div className="actions-menu">
                            {comment.isMine ? (
                                <>
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={() => onDelete(comment.commentId)}>삭제</button>
                                </>
                            ) : (
                                <button onClick={handleReport}>신고하기</button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
export default CommentItem;