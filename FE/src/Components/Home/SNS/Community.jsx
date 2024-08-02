import { useState, useEffect } from 'react';

// 초기 댓글 데이터
const initialComments = [
    {
        userId: 1,
        commentId: 1,
        storybookId: 1, // 스토리북 ID를 추가해야 합니다. 예제에서는 가정한 값입니다.
        content: "정말 감동적이고 멋있는 이야기지요?",
        isMine: true,
        createdDate: '2024-07-01',
        modifiedDate: null
    },
    {
        userId: 3,
        commentId: 2,
        storybookId: 3,
        content: "너무 슬퍼요ㅠㅠ",
        isMine: false,
        createdDate: '2024-07-02',
        modifiedDate: null
    },
    {
        userId: 2,
        commentId: 3,
        storybookId: 4,
        content: "매우 기특한 이야기네요~~",
        isMine: false,
        createdDate: '2024-07-04',
        modifiedDate: null
    }
];

const Community = ({ dummyList, cardId, emojiCounts, handleEmojiClick }) => {
    // 필터링된 댓글만 상태로 저장
    const [comments, setComments] = useState(initialComments.filter(comment => comment.storybookId === cardId));
    const [commentText, setCommentText] = useState('');

    // 댓글 추가 함수
    const addComment = (text) => {
        const newComment = {
            userId: 'currentUserId', // 예를 들어 현재 사용자 ID를 동적으로 처리
            commentId: comments.length + 1,
            storybookId: cardId,
            content: text,
            isMine: true, // 현재 사용자가 작성한 것으로 가정
            createdDate: new Date().toISOString(),
            modifiedDate: null
        };
        setComments(comments => [...comments, newComment]);
        setCommentText('');
    };

    const onCommentSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim()) {
            addComment(commentText);
        }
    };

    const handleUpdateComment = (id) => {
        // 실제 로직 필요, 예를 들어 수정 모달 표시
    };

    const handleDeleteComment = (id) => {
        setComments(comments => comments.filter(comment => comment.commentId !== id));
    };

    return (
        <div className="community-container">