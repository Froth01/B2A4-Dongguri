import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const action = {
  getAvatars: createAsyncThunk("GET/AVATARS", async () => {
    return axios({})
  })
  
}

const avatarSlice = createSlice({
  name: 'avatar',
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

export const { setList } = avatarSlice.actions;
export default avatarSlice.reducer;