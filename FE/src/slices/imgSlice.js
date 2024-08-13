import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchImgUrl } from '../Api/api'

// 비동기 이미지 url추출
export const imgUpload = createAsyncThunk('img/upload', async (file, { rejectWithValue }) => {
  try {
    const data = await fetchImgUrl(file);
    return data.data.url;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const imgSlice = createSlice({
  name: 'img', 
  initialState: {
    url: null, // 이미지 URL을 저장할 초기 상태
    loading: false, // 로딩 상태를 나타내는 플래그
    error: null // 오류 메시지를 저장할 초기 상태
  },
  reducers: {}, // 동기 액션 리듀서를 정의하는 부분입니다. 현재는 비어 있습니다.
  extraReducers: (builder) => {
    builder
      .addCase(imgUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(imgUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload;
      })
      .addCase(imgUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
  },
});

export default imgSlice.reducer;