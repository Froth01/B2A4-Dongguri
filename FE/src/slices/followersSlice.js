import { createSlice } from "@reduxjs/toolkit";


const followersSlice = createSlice({
  name: 'followers',
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
      setFollowersList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setFollowingList } = followersSlice.actions;
export default followersSlice.reducer;