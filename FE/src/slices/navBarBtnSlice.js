import { createSlice } from "@reduxjs/toolkit";

const navBarBtnSlice = createSlice({
  name: 'navBarBtn',
  initialState: {
    list: [
      ['/img/navbar/storybook.png','/storybook'],
      ['/img/navbar/storyworld.png',null],
      ['/img/navbar/avatars.png','/avatars'],
      ['/img/navbar/sns.png','/sns']
    ],
  },
    reducers: {
      setList(state,action) {
        state.list = action.payload;
      },
      setTargetUser(state,action) {
        state.list[1][1] = `storyworld/${action.payload.userId}`;
      }
    }
});

export const { setList, setTargetUser } = navBarBtnSlice.actions;
export default navBarBtnSlice.reducer;