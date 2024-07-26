import { createSlice } from "@reduxjs/toolkit";

const navBarBtnSlice = createSlice({
  name: 'navBarBtn',
  initialState: {
    list: [
      ['/img/navbar/storybook.png','/storybook'],
      ['/img/navbar/storyworld.png','/storyworld'],
      ['/img/navbar/avatars.png','/avatars'],
      ['/img/navbar/sns.png','/sns']
    ],
  },
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setList } = navBarBtnSlice.actions;
export default navBarBtnSlice.reducer;