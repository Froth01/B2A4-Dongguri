import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin, fetchSignup, fetchUser, fetchUserUpdate } from '../Api/api'

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
export const signup = createAsyncThunk('auth/signup', async (signupForm, { rejectWithValue }) => {
  try {
    const data = await fetchSignup(signupForm);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 비동기 userId - 유저정보 추출
export const getUserInfo = createAsyncThunk('user/userId', async (userId, { rejectWithValue }) => {
  try {
    const data = await fetchUser(userId);
    return data.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

// 비동기 유저정보 수정
export const UpdateUserInfo = createAsyncThunk('user/userId/update', async (updateForm, { rejectWithValue }) => {
  try {
    const data = await fetchUserUpdate(updateForm);
    return data.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthObject(state, action) {
      state.object = action.payload;
    },
    resetAuthState(state) {
      // 초기 상태로 리셋
      return initialState;
    }
  }
});

export const { setAuthObject, resetAuthState } = authSlice.actions;
export default authSlice.reducer;