// 댓글 데이터
const commentsData = [
  {
      userId: 1,
      commentId: 1,
      storybookId: 1,  // 스토리북 ID 추가
      content: "정말 감동적이고 멋있는 이야기지요?",
      isMine: true,
      createdDate: '2024-07-01',
      modifiedDate: null
  },
  {
      userId: 3,
      commentId: 2,
      storybookId: 3,  // 다른 스토리북 ID
      content: "너무 슬퍼요ㅠㅠ",
      isMine: false,
      createdDate: '2024-07-02',
      modifiedDate: null
  },
  {
      userId: 2,
      commentId: 3,
      storybookId: 4,  // 다른 스토리북 ID
      content: "매우 기특한 이야기네요~~",
      isMine: false,
      createdDate: '2024-07-04',
      modifiedDate: null
  }
];

// Community 컴포넌트 수정
const Community = ({ dummyList, cardId }) => {
  const [comments, setComments] = useState([]);

  // 컴포넌트가 마운트될 때 선택한 카드 ID에 맞는 댓글을 필터링
  useEffect(() => {
      const filteredComments = commentsData.filter(comment => comment.storybookId === cardId);
      setComments(filteredComments);
  }, [cardId]);  // cardId가 변경될 때마다 댓글을 다시 필터링

  const [commentText, setCommentText] = useState('');

  // 댓글 입력 및 제출 핸들러는 동일하게 유지
  const onCommentChange = (event) => {
      setCommentText(event.target.value);
  };

  const onCommentSubmit = (event) => {
      event.preventDefault();
      if (commentText.trim()) {
          const newComment = {
              userId: 'currentUserId', // 현재 사용자 ID (가정)
              commentId: comments.length + 1,
              storybookId: cardId,
              content: commentText,
              isMine: true,  // 현재 사용자가 작성한 것으로 가정
              createdDate: new Date().toISOString(),
              modifiedDate: null
          };
          setComments([...comments, newComment]);
          setCommentText('');
      }
  };

  return (
      <div className="community-container">
          {/* 프로필 섹션 및 이모지 표시는 동일하게 유지 */}
          <div className="sns-comments">
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
              {comments.map((comment) => (
                  <CommentItem key={comment.commentId} text={comment.content} onUpdate={() => {}} onDelete={() => {}} />
              ))}
          </div>
      </div>
  );
};
