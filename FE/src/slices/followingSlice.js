import { createSlice } from "@reduxjs/toolkit";


const followingSlice = createSlice({
  name: 'following',
  initialState: {
    list: [{
      "followId": 1,
      "userId": 1,
      "nickname": "following1",
      "profileImageUrl": "/img/home/test.png",
      "isFollow": true
    }],
  },
    reducers: {
      setFollowingList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setFollowingList } = followingSlice.actions;
export default followingSlice.reducer;