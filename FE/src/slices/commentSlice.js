import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments, postComment, patchComment, deleteComment } from '../Api/api';

// 댓글 리스트 조회
export const getCommentsThunk = createAsyncThunk(
  'comments/getComments',
  async ({storybookId, page}, thunkAPI) => {
    try {
      const response = await fetchComments(storybookId, page);
      return {comments: response, page};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 댓글 추가
export const addCommentThunk = createAsyncThunk(
  'comments/addComment',
  async ({ storybookId, content }, thunkAPI) => {
    try {
      const response = await postComment(storybookId, content);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 댓글 수정
export const updateCommentThunk = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }, thunkAPI) => {
    try {
      const response = await patchComment(commentId, content);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 댓글 삭제
export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      const response = await deleteComment(commentId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null,
        page: 0,
        hashMore: true,
    },
    reducers: {
      updateCommentsList: (state, action) => {
        const fetchedComments = action.payload || [];
        const uniqueComments = fetchedComments.filter(
          newComment => !state.comments.some(existingComment => existingComment.commentId === newComment.commentId)
        );
        state.comments = [...state.comments, ...uniqueComments];
        state.hasMore = fetchedComments.length > 0;  // 다음 페이지가 있는지 여부를 업데이트
      },
      addNewComment: (state, action) => {
        const newComment = action.payload;
        if (!state.comments.some(comment => comment.commentId === newComment.commentId)) {
          state.comments = [newComment, ...state.comments];
        }
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCommentsThunk.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.page = action.payload.page; // 페이지 번호 업데이트

              // 새로 가져온 댓글들
              const fetchedComments = action.payload.comments.data.content || [];

              // 기존 댓글과 합치되 중복되는 commentId가 없는 경우에만 추가
              const uniqueComments = fetchedComments.filter(
                  newComment => !state.comments.some(existingComment => existingComment.commentId === newComment.commentId)
              );

              state.comments = [...state.comments, ...uniqueComments]; // 기존 댓글에 새 댓글을 추가

              // 더 가져올 댓글이 있는지 여부를 판단
              state.hasMore = fetchedComments.length > 0;
            })
            .addCase(getCommentsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.comments = [action.payload, ...state.comments]; // 새로운 댓글을 추가하여 첫 번째 위치에 삽입
            })
            .addCase(updateCommentThunk.fulfilled, (state, action) => {
                const index = state.comments.findIndex(c => c.commentId === action.payload.commentId);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.comments = state.comments.filter(c => c.commentId !== action.payload.commentId);
            });
    },
});

export const { updateCommentsList, addNewComment } = commentSlice.actions;

export const selectComments = (state) => state.comments.comments || [];
export const selectCommentPage = (state) => state.comments.page;
export const selectCommentStatus = (state) => state.comments.status;
export const selectCommentHasMore = (state) => state.comments.hasMore;
export const selectCommentError = (state) => state.comments.error;

export default commentSlice.reducer;
