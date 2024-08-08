import { createSlice } from "@reduxjs/toolkit";
import { fetchWorld, fetchWorldUpdate } from "../Api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 월드정보 받아오기
export const getWorldInfo = createAsyncThunk('storyworld/get', async (userId, { rejectWithValue }) => {
  try { 
    const data = await fetchWorld(userId);
    console.log(data.data)
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 비동기 월드정보 수정
export const UpdateWorldInfo = createAsyncThunk('storyworlds/update', async (patchInfo, { rejectWithValue }) => {
  try {
    const data = await fetchWorldUpdate(patchInfo);
    return data.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});
const worldInfoSlice = createSlice({
  name: 'worldInfo',
  initialState: {
    object: {
      "backgroundType": "WOODS",
      "backgroundUrl":"/img/storyworld/WOODS.png",
      "storybooks" : [
        {
          storybookId : 1,
          transparentImageUrl: "string",
        }]
    },
  },
    reducers: {
      setWorldObject(state,action) {
        state.object = action.payload;
      }
    }
});

export const { setWorldObject } = worldInfoSlice.actions;
export default worldInfoSlice.reducer;