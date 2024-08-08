import { createSlice } from "@reduxjs/toolkit";

const mainBtnSlice = createSlice({
  name: 'mainBtn',
  initialState: {
    list: [
      ['/img/home/todaytale.png','/storybook/storytoday'],
      ['/img/home/freetale.png','/storybook/storyfree'],
      ['/img/home/mypage.png',null],
      ['/img/home/mydong.png','/avatars']
    ]},
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      },
      setTargetUser(state,action) {
        state.list[2][1] = `/storyworld/${action.payload.userId}`;
      }
    }
});

export const { setList, setTargetUser } = mainBtnSlice.actions;
export default mainBtnSlice.reducer;