import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin, fetchSignup } from '../Api/api'

// 비동기 로그인 액션
export const login = createAsyncThunk('auth/login', async ({ oauthServerType, code }, { rejectWithValue }) => {
  try {
    const data = await fetchLogin(code, oauthServerType);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 비동기 회원가입 액션
export const signup = createAsyncThunk('auth/signup', async ({ name, email, nickName, profileImageUrl, oauthServerType }, { rejectWithValue }) => {
  try {
    const data = await fetchSignup(name, email, nickName, profileImageUrl, oauthServerType);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth', // 슬라이스 이름을 'auth'로 설정합니다.
  initialState: {
    user: null, // 사용자 정보를 저장할 초기 상태입니다.
    loading: false, // 로딩 상태를 저장할 초기 상태입니다.
    error: null, // 오류 메시지를 저장할 초기 상태입니다.
  },
  reducers: {}, // 동기 액션 리듀서를 정의하는 부분입니다. 현재는 비어 있습니다.
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // 로그인 요청이 시작되면 로딩 상태를 true로 설정합니다.
        state.error = null; // 오류 상태를 초기화합니다.
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; // 로그인 요청이 완료되면 로딩 상태를 false로 설정합니다.
        state.user = action.payload; // 성공적으로 받은 사용자 데이터를 상태에 저장합니다.
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; // 로그인 요청이 실패하면 로딩 상태를 false로 설정합니다.
        state.error = action.payload; // 오류 메시지를 상태에 저장합니다.
      })
      .addCase(signup.pending, (state) => {
        state.loading = true; // 회원가입 요청이 시작되면 로딩 상태를 true로 설정합니다.
        state.error = null; // 오류 상태를 초기화합니다.
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false; // 회원가입 요청이 완료되면 로딩 상태를 false로 설정합니다.
        state.user = action.payload; // 성공적으로 받은 사용자 데이터를 상태에 저장합니다.
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false; // 회원가입 요청이 실패하면 로딩 상태를 false로 설정합니다.
        state.error = action.payload; // 오류 메시지를 상태에 저장합니다.
      });
  },
});

export default authSlice.reducer;