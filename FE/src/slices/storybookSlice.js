import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: '',
  keywords: ['', '', '', ''],
  content: '',
  originalImageUrl: '',
  transformedImageUrl: '',
  voiceRecordingFile: '',
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
    setVoiceRecordingFile(state,action) {
      state.voiceRecordingFile =action.payload
    },
    clearStorybook() {
      return initialState;  // 초기 상태로 되돌립니다.
    },
  }
});

// actions
export const { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl, setVoiceRecordingFile, clearStorybook } = storyBookSlice.actions;

// selectors
export const selectStorybook = (state) => state.storyBook;
export const selectVoiceRecordingFile = (state) => state.storyBook.voiceRecordingFile;

export default storyBookSlice.reducer;
