import { createSlice } from "@reduxjs/toolkit";
import { fetchWorld } from "../Api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWorldInfo = createAsyncThunk('storyworld/get', async (userId, { rejectWithValue }) => {
  try { 
    const data = await fetchWorld(userId);
    console.log(data.data)
    return data.data.url;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const worldInfoSlice = createSlice({
  name: 'worldInfo',
  initialState: {
    object: {
      "backgroundType": "PARK",
      "backgroundUrl":"string",
      "storybooks" : 
        {
          storybookId : 1,
          genre: "HAPPY",
          keyword: ["나무", "숲"],
          content: "string",
          originalImageUrl: "string",
          transformedImageUrl: "string",
          transparentImageUrl: "string",
          voiceRecordingUrl: "string",
          isMine : true,
          isTodayKeyword : true,
          createdDate: "2024-02-18 07:53:23.795698",
          lastModifyDate: "2024-02-18 07:53:23.795698"
        }
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