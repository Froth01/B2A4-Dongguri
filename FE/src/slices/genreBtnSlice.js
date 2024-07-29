import { createSlice } from "@reduxjs/toolkit";

const genreBtnSlice = createSlice({
  name:'genreBtn',
  initialState: {
    list: [
      ["/img/storybook/storygenre/Pleasure.png", "기쁨 버튼", '/storybook/storyimg'],
      ["/img/storybook/storygenre/Happy.png", "행복 버튼", '/storybook/storyimg'],
      ["/img/storybook/storygenre/Sad.png", "슬픔 버튼", '/storybook/storyimg'],
      ["/img/storybook/storygenre/Joy.png", "즐거움 버튼", '/storybook/storyimg'],
    ]},
    reducers: {
      setList(state,action) {
        state.list = action.payload
      }
  }
})

export const {setList} = genreBtnSlice.actions
export default genreBtnSlice.reducer