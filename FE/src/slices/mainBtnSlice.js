import { createSlice } from "@reduxjs/toolkit";

const mainBtnSlice = createSlice({
  name: 'mainBtn',
  initialState: {
    list: [
      '/img/home/todaytale.png',
      '/img/home/freetale.png',
      '/img/home/mypage.png',
      '/img/home/mydong.png'
    ]},
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setList } = mainBtnSlice.actions;
export default mainBtnSlice.reducer;