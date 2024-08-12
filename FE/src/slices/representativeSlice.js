// import { createSlice } from '@reduxjs/toolkit'
// import { fetchRepresentative } from '../Api/api';

// const representativeSlice = createSlice({
//   name: 'representative',
//   initialState: {
//     avatarId: '',
//       name: '동그리',
//       exp: '0',
//       isRepresentative: 'true',
//       avatarType: 'GYEOMI',
//       avatarLevel: 'ONE',
//       displayLevel: 'ONE'
//   // object: {
//   //   avatarId: '',
//   //     name: '동그리',
//   //     exp: '0',
//   //     isRepresentative: 'true',
//   //     avatarType: 'GYEOMI',
//   //     avatarLevel: 'ONE',
//   //     displayLevel: 'ONE'
//   //   }
// },
//   reducers: {
//     setRepresentative(state, action) {
//       state.object= action.payload
//     }
//   }
// })

// //action
// export const { setRepresentative } = representativeSlice.actions

// // selector
// export const selectRepresentative = (state) => state.representative.object

// // thunk
// export const representativeApi = () => async () => {
//   try {
//     // // 더미
//     // const data = {
//     //   avatarId: 1,
//     //   name: '동글동글동그리',
//     //   exp: 7,
//     //   isRepresentative: 'true',
//     //   avatarType: 'MINI',
//     //   avatarLevel: 'ONE',
//     //   displayLevel: 'TWO'
//     // };
//     const data = await fetchRepresentative();
//     console.log('api요청',data.data)
//     return data.data // 응답이 배열 형태이므로 첫 번째 요소를 사용
//   } catch (error) {
//     console.error('error', error);
//   }
// };

// export default representativeSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRepresentative } from "../Api/api";

// createAsyncThunk 정의
export const fetchRepresentativeThunk = createAsyncThunk(
  'representative/fetchRepresentative',
  async () => {
    const response = await fetchRepresentative();
    return response;
  }
);

// slice 정의
const representativeSlice = createSlice({
  name: 'representative',
  initialState: {
    object: {
      avatarId: '',
      name: '동그리',
      exp: '0',
      isRepresentative: true, // boolean으로 수정
      avatarType: 'GYEOMI',
      avatarLevel: 'ONE',
      displayLevel: 'ONE'
    }
  },
  reducers: {
    setRepresentative(state, action) {
      state.object = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepresentativeThunk.fulfilled, (state, action) => {
        state.object = action.payload;
      });
  }
});

// 액션 내보내기
export const { setRepresentative } = representativeSlice.actions;

// 셀렉터 내보내기
export const selectRepresentative = (state) => state.representative.object;

// 리듀서 내보내기
export default representativeSlice.reducer;