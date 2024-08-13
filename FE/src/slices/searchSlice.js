// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSearchResults, fetchUserResults, fetchNicknameResults } from '../Api/api';

// 키워드 검색
export const fetchSearchResultsThunk = createAsyncThunk(
  'search/fetchSearchResults',
  async ({keyword, page}) => {
    console.log('slice',keyword,page)
    const response = await fetchSearchResults(keyword,page);
    return response;
  }
);

// 유저 id 검색
export const fetchUserResultsThunk = createAsyncThunk(
  'search/fetchUserResults',
  async (userId) => {
    const response = await fetchUserResults(userId);
    return response;
  }
);

// 유저 닉네임 검색
export const fetchNicknameResultsThunk = createAsyncThunk(
  'search/fetchNicknameResults',
  async ({nickname, page}) => {
    console.log('slice',nickname,page)
    const response = await fetchNicknameResults(nickname,page);
    return response;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // 키워드 검색
    keyword: '',
    results: [],
    // 유저 id 검색
    userId: '',
    userResults: {
      userId: '',
      nickname: '',
      profileImageUrl: ''
    },
    // 유저 닉네임 검색
    nickname:'',
    nicknameResults: [],
    searchType: 'storybook',  
    page: 0,
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
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setSearchType(state, action) {
      state.searchType = action.payload;
    },
    setPage(state, action) {  // 페이지 상태 업데이트
      state.page = action.payload;
    },
    setResult(state, action) {  // 검색 결과 새로고침
      state.search = action.payload;
    },
    clearSearchResults(state) {  // 상태 초기화 액션 추가
      state.keyword='';
      state.userId='';
      state.nickname='';
      state.storybookResults = [];
      state.nicknameResults = [];
      state.userResults = {
        userId: '',
        nickname: '',
        profileImageUrl: ''
      }
    }
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
    // 유저 id
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
      })
    // 유저 닉네임
      .addCase(fetchNicknameResultsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNicknameResultsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.nicknameResults = action.payload;
      })
      .addCase(fetchNicknameResultsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setKeyword, setUserId, setNickname, setSearchType, setResult, clearSearchResults } = searchSlice.actions;

// 동화
export const selectKeyword = (state) => state.search.keyword;
export const selectResults = (state) => state.search.results;
export const selectPage = (state) => state.search.page;

// 유저 id
export const selectUserId = (state) => state.search.userId;
export const selectUserResults = (state) => state.search.userResults;
export const selectSearchType = (state) => state.search.searchType;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

// 유저 닉네임
export const selectNickname = (state) => state.search.nickname
export const selectNicknameResults = (state) => state.search.nicknameResults;

export default searchSlice.reducer;
