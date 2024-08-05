import { createSlice } from "@reduxjs/toolkit";

const pathHistorySlice = createSlice({
  name: 'pathHistroy',
  initialState: {
    paths: [],
  },
  reducers: {
    addPath(state, action) {
      state.paths.push(action.payload);
    },
    resetPaths(state) {
      state.paths = [];
    }
  }
})

export const { addPath, resetPaths } = pathHistorySlice.actions;
export const selectPathHistory = (state) => state.pathHistory.paths;
export default pathHistorySlice.reducer;