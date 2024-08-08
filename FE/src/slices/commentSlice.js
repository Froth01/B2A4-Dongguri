import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postComment, patchComment, deleteComment, fetchComments } from '../Api/api';

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ storybookId, content }, { rejectWithValue }) => {
    try {
      const response = await postComment(storybookId, content);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await patchComment(commentId, content);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await deleteComment(commentId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (storybookId, { rejectWithValue }) => {
    try {
      const response = await fetchComments(storybookId);
      return response.comments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
      comments: [], // comments 배열 초기화
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addComment.pending, (state) => {
          state.loading = true;
        })
        .addCase(addComment.fulfilled, (state, action) => {
          state.loading = false;
          state.comments.push(action.payload);
        })
        .addCase(addComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateComment.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateComment.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.comments.findIndex(comment => comment.commentId === action.payload.commentId);
          if (index !== -1) {
            state.comments[index] = action.payload;
          }
        })
        .addCase(updateComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(removeComment.pending, (state) => {
          state.loading = true;
        })
        .addCase(removeComment.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = state.comments.filter(comment => comment.commentId !== action.meta.arg);
        })
        .addCase(removeComment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getComments.pending, (state) => {
          state.loading = true;
        })
        .addCase(getComments.fulfilled, (state, action) => {
          state.loading = false;
          state.comments = action.payload.comments; // 여기서 action.payload.comments로 설정
        })
        .addCase(getComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default commentSlice.reducer;
  
  