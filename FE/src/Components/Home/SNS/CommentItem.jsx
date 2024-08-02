/* eslint-disable react/prop-types */

const CommentItem = ({ id, text, onUpdate, onDelete }) => {
    const onUpdateComment = () => {
        onUpdate(id);
    };

    const onDeleteComment = () => {
        onDelete(id);
    };

    return (
        <div className="CommentItem">
            <div className="content">{text}</div>
            <button onClick={onUpdateComment}>수정</button>
            <button onClick={onDeleteComment}>삭제</button>
        </div>
    );
};

export default CommentItem;