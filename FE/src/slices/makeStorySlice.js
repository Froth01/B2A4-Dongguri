import { createSlice } from "@reduxjs/toolkit";

const makeStorySlice = createSlice({
  name: 'makeStory',
  // initialState: {
  //   genre: 'HAPPY',
  //   transformType: 'https://b2a4.s3.ap-northeast-2.amazonaws.com/f8420cbc-d690-4243-b2cb-986bdf54c11d.jpg',
  //   originalImageUrl: 'https://b2a4.s3.ap-northeast-2.amazonaws.com/afa99be1-caa8-4e19-9e15-73d49a9b3531.jpg',
  //   keywords: ['집', '기사', '', '']
  // },
  initialState: {
    genre: '',
    transformType: '',
    originalImageUrl: '',
    keywords: ['', '', '', '']
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
      state.keywords = action.payload;
    },
    resetStory(state) { 
      state.genre = '';
      state.transformType = '';
      state.originalImageUrl = '';
      state.keywords = ['', '', '', ''];
      localStorage.removeItem('uploadedImage')
    }
  }
})

// actions
export const { setGenre, setTransformType, setOriginalImageUrl, setKeyword, resetStory } = makeStorySlice.actions;

// selectors
export const selectGenre = (state) => state.makeStory.genre;
export const selectTransformType = (state) => state.makeStory.transformType;
export const selectOriginalImageUrl = (state) => state.makeStory.originalImageUrl;
export const selectKeyword = (state) => state.makeStory.keywords;
export const selectMakeStory = (state) => state.makeStory;

export default makeStorySlice.reducer;
