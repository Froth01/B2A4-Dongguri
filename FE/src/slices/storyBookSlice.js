import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: '',
  keywords: ['', '', '', ''],
  content: '',
  originalImageUrl: '',
  transformedImageUrl: ''
};

const storyBookSlice = createSlice({
  name: 'storyBook',
  initialState,
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },
    setKeywords(state, action) {
      state.keywords = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setOriginalImageUrl(state, action) {
      state.originalImageUrl = action.payload;
    },
    setTransformedImageUrl(state, action) {
      state.transformedImageUrl = action.payload;
    },
    clearStorybook() {
      return initialState;  // 초기 상태로 되돌립니다.
    },
  }
});

// actions
export const { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl, clearStorybook } = storyBookSlice.actions;

// selectors
export const selectStorybook = (state) => state.storyBook;

export default storyBookSlice.reducer;
