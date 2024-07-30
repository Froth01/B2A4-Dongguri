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
      setObject(state,action) {
        state.object = action.payload;
      }
    }
});

export const { setList } = userInfoSlice.actions;
export default userInfoSlice.reducer;