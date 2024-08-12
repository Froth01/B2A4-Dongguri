import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments, postComment, patchComment, deleteComment } from '../Api/api';

// 댓글 리스트 조회
export const getCommentsThunk = createAsyncThunk(
  'comments/getComments',
  async (storybookId, thunkAPI) => {
    try {
      const response = await fetchComments(storybookId);
      return response;
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCommentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(getCommentsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        state.comments.push(action.payload);
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

export const selectComments = (state) => state.comments.comments || [];
export const selectCommentStatus = (state) => state.comments.status;
export const selectCommentError = (state) => state.comments.error;

export default commentSlice.reducer;