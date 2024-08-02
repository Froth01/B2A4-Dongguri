import { createSlice } from "@reduxjs/toolkit";


const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    object: {
      "id": 1,
      "email": "test1@testing.com",
      "name": "testname",
      "nickName": "testandtest",
      "profileImageUrl": "/img/home/test.png",
      "oauthServerType": "KAKAO",
      "isFirst": true,
      "createdDate": "2024-02-18 07:53:23.795698",
      "lastModifyDate": "2024-02-18 07:53:23.795698"
    },
  },
    reducers: {
      setUserObject(state,action) {
        state.object = action.payload;
      }
    }
});

export const { setUserObject } = userInfoSlice.actions;
export default userInfoSlice.reducer;