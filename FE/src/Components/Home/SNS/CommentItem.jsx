import React from 'react';

// CommentItem 컴포넌트 정의
const CommentItem = ({ comment, onUpdate, onDelete }) => {
    // 댓글 수정 핸들러
    const handleUpdate = () => {
        // onUpdate 핸들러를 호출하고, 현재 댓글의 ID를 전달
        onUpdate(comment.commentId);
    };

    // 댓글 삭제 핸들러
    const handleDelete = () => {
        // onDelete 핸들러를 호출하고, 현재 댓글의 ID를 전달
        onDelete(comment.commentId);
    };

    return (
        <div className="comment-item">
            <div className="comment-content">
                <p>{comment.content}</p>  {/* 댓글 내용 표시 */}
            </div>
            <div className="comment-actions">
                {comment.isMine && (  // 댓글이 현재 사용자의 것이라면 수정 및 삭제 버튼 표시
                    <>
                        <button onClick={handleUpdate}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
