import { createSlice } from "@reduxjs/toolkit";

const makeStorySlice = createSlice({
  name: 'makeStory',
  initialState: {
    genre: '',
    transformType: '',
    originalImageUrl: '',
    keyword: ['', '', '', '']
  },
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },
    setTransformType(state, action) { 
      state.transformType = action.payload;
    },
    setOriginalImageUrl(state, action) { 
      state.originalImageUrl = action.payload;
    },
    setKeyword(state, action) { 
      state.keyword = action.payload;
    },
    resetStory(state) { 
      state.genre = '';
      state.transformType = '';
      state.originalImageUrl = '';
      state.keyword = [];
    }
  }
})

// actions
export const { setGenre, setTransformType, setOriginalImageUrl, setKeyword, resetStory } = makeStorySlice.actions;

// selectors
export const selectGenre = (state) => state.makeStory.genre;
export const selectTransformType = (state) => state.makeStory.transformType;
export const selectOriginalImageUrl = (state) => state.makeStory.originalImageUrl;
export const selectKeyword = (state) => state.makeStory.keyword;

export default makeStorySlice.reducer;
