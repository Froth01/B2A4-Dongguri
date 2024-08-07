import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAudioUrl } from '../Api/api'

// 비동기 오디오 url추출
export const audioUpload = createAsyncThunk('audio/upload', async (file, { rejectWithValue }) => {
  try {
    const data = await fetchAudioUrl(file);
    console.log(data.data)
    return data.data.url;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const audioSlice = createSlice({
  name: 'audio', 
  initialState: {
    url: null, // 이미지 URL을 저장할 초기 상태
    loading: false, // 로딩 상태를 나타내는 플래그
    error: null // 오류 메시지를 저장할 초기 상태
  },
  reducers: {}, // 동기 액션 리듀서를 정의하는 부분입니다. 현재는 비어 있습니다.
  extraReducers: (builder) => {
    builder
      .addCase(audioUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(audioUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload;
      })
      .addCase(audioUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });  
  },
});

export default audioSlice.reducer;