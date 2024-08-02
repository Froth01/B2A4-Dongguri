import { createSlice } from "@reduxjs/toolkit";

const genreBtnSlice = createSlice({
  name:'genreBtn',
  initialState: {
    list: [
      ["/img/storybook/storygenre/Pleasure.png", "기쁨 버튼", '/storybook/storyimg','PLEASURE'],
      ["/img/storybook/storygenre/Happy.png", "행복 버튼", '/storybook/storyimg','HAPPY'],
      ["/img/storybook/storygenre/Sad.png", "슬픔 버튼", '/storybook/storyimg','SAD'],
      ["/img/storybook/storygenre/Joy.png", "즐거움 버튼", '/storybook/storyimg','JOY'],
    ]},
    reducers: {
      setList(state,action) {
        state.list = action.payload
      }
  }
})

// actions
export const { setList } = genreBtnSlice.actions;

// selectors
export const selectGenreBtnList = (state) => state.genreBtn.list;

export default genreBtnSlice.reducer