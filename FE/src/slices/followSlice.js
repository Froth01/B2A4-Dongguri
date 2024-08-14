import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFollow, fetchFollowDelete, fetchGetFollowList } from "../Api/api";


//팔로 리스트 받기
export const getFollowList = createAsyncThunk('getFollowList', async (followForm, { rejectWithValue }) => {
  try {
    const data = await fetchGetFollowList(followForm);
    console.log('follow슬라이스에서뱉은거:',data)
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 팔로우 추가
export const AddFollow = createAsyncThunk('addfollow', async (targetUserId, { rejectWithValue }) => {
  try {
    const data = await fetchFollow(targetUserId)
    console.log(data.data)
    return data.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// 팔로우 취소

export const DeleteFollow = createAsyncThunk('deletefollow', async (followId, { rejectWithValue }) => {
  try {
    const data = await fetchFollowDelete(followId)
    return data.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const followSlice = createSlice({
  name: 'following',
  initialState: {
    list: [],
  },
    reducers: {
      setFollowingList(state,action) {
        state.list = action.payload;
      }
    }
});

export const { setFollowingList } = followSlice.actions;
export default followSlice.reducer;