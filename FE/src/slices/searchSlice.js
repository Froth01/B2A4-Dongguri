// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchResults, fetchUserResults } from '../Api/api';

export const fetchSearchResultsThunk = createAsyncThunk(
  'search/fetchSearchResults',
  async (keyword) => {
    const response = await fetchSearchResults(keyword);
    return response;
  }
);

export const fetchUserResultsThunk = createAsyncThunk(
  'search/fetchUserResults',
  async (userId) => {
    const response = await fetchUserResults(userId);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    userId: '',
    results: [],
    userResults: null,
    searchType: 'storybook',  
    loading: false,
    error: null,
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // 동화 
      .addCase(fetchSearchResultsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResultsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    // 유저
      .addCase(fetchUserResultsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserResultsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userResults = action.payload;
      })
      .addCase(fetchUserResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setKeyword, setUserId, setSearchType } = searchSlice.actions;

// 동화
export const selectKeyword = (state) => state.search.keyword;
export const selectResults = (state) => state.search.results;
// 유저
export const selectUserId = (state) => state.search.userId;
export const selectUserResults = (state) => state.search.userResults;
export const selectSearchType = (state) => state.search.searchType;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
