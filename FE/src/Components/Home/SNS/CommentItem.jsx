import React, { useState } from 'react';

const CommentItem = ({ comment, onUpdate, onDelete, onReport }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);

    const handleEdit = () => {
        setIsEditing(true);
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
    );
};

export default CommentItem;
