import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchResults } from '../Api/api';

// 비동기 작업 정의
export const fetchSearchResultsThunk = createAsyncThunk(
  'search/fetchSearchResults',
  async (keyword) => {
    const response = await fetchSearchResults(keyword);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

// 액션과 셀렉터 내보내기
export const { setKeyword, setResults } = searchSlice.actions;
export const selectKeyword = (state) => state.search.keyword;
export const selectResults = (state) => state.search.results;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer;
