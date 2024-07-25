import { createSlice } from "@reduxjs/toolkit";

const imgUrlSlice = createSlice({
  name: 'imgUrl',
  initialState: {
    list: [
      '/img/navbar/storybook.png',
      '/img/navbar/storyworld.png',
      '/img/navbar/avatars.png',
      '/img/navbar/sns.png'
    ],
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      }
    }
  }
});

export const { setList } = imgUrlSlice.actions;
export default imgUrlSlice.reducer;