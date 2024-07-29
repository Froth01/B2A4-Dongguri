import { createSlice } from "@reduxjs/toolkit";

const circleBtnSlice = createSlice({
  name: 'circleBtn',
  initialState: {
    list: [
      ['/img/storybook/storyimg/Picture.png','사진처럼','/storybook/storykeyword'],
      ['/img/storybook/storyimg/Cute.png','귀엽게','/storybook/storykeyword'],
    ]},

    reducers: {
      setList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setList } = circleBtnSlice.actions;
export default circleBtnSlice.reducer;