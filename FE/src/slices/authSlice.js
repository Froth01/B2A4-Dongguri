import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin, fetchSignup } from '../Api/api'

// 비동기 로그인 액션
export const login = createAsyncThunk((args) => `auth/login/${args.oauthServerType}`, async (args, { rejectWithValue }) => {
  try {
    const data = await fetchLogin(args.oauthServerType, args.code);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 비동기 회원가입 액션
export const signup = createAsyncThunk('auth/signup', async ({ name, email, nickname, profileImageUrl, oauthServerType }, { rejectWithValue }) => {
  try {
    const data = await fetchSignup(name, email, nickname, profileImageUrl, oauthServerType);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    object: {
      userId: 0,
      email: "test1@testing.com",
      name: "testname",
      nickname: "testandtest",
      profileImageUrl: "/img/home/test.png",
      oauthServerType: "KAKAO",
      isFirst: true,
      createdDate: "2024-02-18 07:53:23.795698",
      lastModifyDate: "2024-02-18 07:53:23.795698"
    },
  },
    reducers: {
      setAuthObject(state,action) {
        state.object = action.payload;
      }
    }
});

export const { setAuthObject } = authSlice.actions;
export default authSlice.reducer;