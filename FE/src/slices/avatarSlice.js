import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetAvatarList } from "../Api/api";

// 아바타 리스트 요청
export const getAvatarList = createAsyncThunk('avatars', async () => {
  try {
    const data = await fetchGetAvatarList();
    return data.data;
  } catch (error) {
    error => {throw error;};
  }
});

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