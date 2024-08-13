import { createSlice } from '@reduxjs/toolkit'
import { fetchRepresentative } from '../Api/api';

const representativeSlice = createSlice({
  name: 'representative',
  initialState: {
  object: {
    avatarId: '',
      name: '동글동글동그리',
      exp: '3',
      isRepresentative: 'true',
      avatarType: 'MINI',
      avatarLevel: 'ONE',
      displayLevel: 'THREE'
    }
},
  reducers: {
    setRepresentative(state, action) {
      state.object= action.payload
    }
  }
})

//action
export const { setRepresentative } = representativeSlice.actions

// selector
export const selectRepresentative = (state) => state.representative.object

// thunk
export const representativeApi = () => async () => {
  try {
    // // 더미
    // const data = {
    //   avatarId: 1,
    //   name: '동글동글동그리',
    //   exp: 7,
    //   isRepresentative: 'true',
    //   avatarType: 'MINI',
    //   avatarLevel: 'ONE',
    //   displayLevel: 'TWO'
    // };
    const data = await fetchRepresentative();
    console.log('api요청',data.data)
    return data.data // 응답이 배열 형태이므로 첫 번째 요소를 사용
  } catch (error) {
    console.error('error', error);
  }
};

export default representativeSlice.reducer