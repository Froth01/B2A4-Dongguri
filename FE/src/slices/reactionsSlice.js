import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeStorybook, unlikeStorybook, getStorybookReactions } from '../Api/api';

export const likeStorybookThunk = createAsyncThunk(
  'reactions/likeStorybook',
  async ({storybookId, reactionType}) => {
    console.log('slice',storybookId, reactionType)
    const response = await likeStorybook(storybookId, reactionType);
    return response;
  }
);

export const unlikeStorybookThunk = createAsyncThunk(
  'reactions/unlikeStorybook',
  async ({storybookId, reactionType}) => {
    console.log('slice',storybookId, reactionType)
    const response = await unlikeStorybook({storybookId, reactionType});
    return response;
  }
);

export const getStorybookReactionsThunk = createAsyncThunk(
  'reactions/getStorybookReactions',
  async ({storybookId}) => {
    console.log('slice',storybookId)
    const response = await getStorybookReactions(storybookId);
    return response;
  }
);

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState: {
    FUN : {"count": 0, "nowState" : false},
    HAPPY : {"count": 0, "nowState" : false},
    SAD : {"count": 0, "nowState" : false},
    JOY : {"count": 0, "nowState" : false},
  },
  reducers: {
    setFUN(state, action) {
      state.fun = action.payload
    },
    setHAPPY(state, action) {
      state.happy = action.payload
    },
    setSAD(state, action) {
      state.sad = action.payload
    },
    setJOY(state, action) {
      state.joy = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStorybookReactionsThunk.fulfilled, (state, action) => {
      const response = action.payload.data;
  
      // 응답이 제대로 왔는지 확인
      if (response) {
        state.FUN = { count: response.funCount, nowState: response.isFunReaction };
        state.HAPPY = { count: response.happyCount, nowState: response.isHappyReaction };
        state.SAD = { count: response.sadCount, nowState: response.isSadReaction };
        state.JOY = { count: response.joyCount, nowState: response.isJoyReaction };
      } else {
        console.error('API 응답 데이터가 예상한 형식과 다릅니다.', response);
      }
    });
  }
  // extraReducers: (builder) => {
  //   builder.addCase(getStorybookReactionsThunk.fulfilled, (state, action) => {
  //     // API로부터 받은 데이터를 state에 반영
  //     state.FUN = { count: action.payload.FUN.count, nowState: action.payload.FUN.nowState };
  //     state.HAPPY = { count: action.payload.HAPPY.count, nowState: action.payload.HAPPY.nowState };
  //     state.SAD = { count: action.payload.SAD.count, nowState: action.payload.SAD.nowState };
  //     state.JOY = { count: action.payload.JOY.count, nowState: action.payload.JOY.nowState };
  //   })
  // }
})
 
export const { setFUN,setHAPPY,setSAD,setJOY} = reactionsSlice.actions;

export const selectFUN = (state) => state.reactions.FUN
export const selectHAPPY = (state) => state.reactions.HAPPY
export const selectSAD = (state) => state.reactions.SAD
export const selectJOY = (state) => state.reactions.JOY

export default reactionsSlice.reducer