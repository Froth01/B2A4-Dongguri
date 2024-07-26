import { createSlice } from "@reduxjs/toolkit";

const mainBtnSlice = createSlice({
  name: 'mainBtn',
  initialState: {
    list: [
      ['/img/home/todaytale.png','/storybook/storytoday'],
      ['/img/home/freetale.png','/storybook/storyfree'],
      ['/img/home/mypage.png','/storyworld'],
      ['/img/home/mydong.png','/avatars']
    ]},
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setList } = mainBtnSlice.actions;
export default mainBtnSlice.reducer;