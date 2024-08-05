import { createSlice } from '@reduxjs/toolkit'
import { fetchRepresentative } from '../Api/api';

const representativeSlice = createSlice({
  name: 'representative',
  initialState: {
    avatarId: '',
    name: '',
    exp: '',
    isRepresentative: '',
    avatarType: '',
    avatarLevel: '',
    displayLevel: ''
  },
  reducers: {
    setRepresentative(state, action) {
      state.representative = action.payload
    }
  }
})

//action
export const { setRepresentative } = representativeSlice.actions

// selector
export const selectRepresentative = (state) => state.representative

// thunk
export const representativeApi = () => async (dispatch) => {
  try {
    const data = await fetchRepresentative();
    dispatch(setRepresentative(data)); // 응답이 배열 형태이므로 첫 번째 요소를 사용
  } catch (error) {
    console.error('error', error);
  }
};

export default representativeSlice.reducer