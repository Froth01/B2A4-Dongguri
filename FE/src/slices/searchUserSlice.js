import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserResults } from '../Api/api';

// 비동기 작업 정의
export const fetchUserResultsThunk = createAsyncThunk(
  'search/fetchUserResults',
  async (userId) => {
    const response = await fetchUserResults(userId);
    return response;
  }
);

const searchUserSlice = createSlice({
  name: 'searchUser',
  initialState: {
    userId: '',
    results:'',
    loading: false,
    error: null,
  },
  reducers: {
    setKeyword(state, action) {
      state.userId = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserResultsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserResultsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchUserResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// action
export const { setUserId, setResults } = searchUserSlice.actions;

// selector
export const selectUserId = (state) => state.search.userId;
export const selectResults = (state) => state.search.results;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export default searchUserSlice.reducer;
