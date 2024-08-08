import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCardListByUserId } from "../Api/api";

export const getCardListByUserId = createAsyncThunk('getMyCardList', async (userId, { rejectWithValue }) => {
  try {
    const data = await fetchCardListByUserId(userId);
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const cardListSlice = createSlice({
  name: 'cardList',
  initialState: {
    list: [{
        "storybookId" : 1,
        "genre" : "HAPPY",
        "keyword" : ["나무", "숲"],
        "content" : "string",
        "originalImageUrl" : "/img/avatars/bini_ONE.png",
        "transformedImageUrl" : "/img/avatars/bini_ONE.png",
        "transparentImageUrl" : "string",
        "voiceRecordingUrl" : "string",
        "isMine" : true,
        "createdDate": "2024-02-18 07:53:23.795698",
        "lastModifyDate": "2024-02-18 07:53:23.795698"
      },
      {
        "storybookId" : 2,
        "genre" : "SAD",
        "keyword" : ["나무", "숲"],
        "content" : "string",
        "originalImageUrl" : "/img/avatars/minni_ONE.png",
        "transformedImageUrl" : "/img/avatars/minni_ONE.png",
        "transparentImageUrl" : "string",
        "voiceRecordingUrl" : "string",
        "isMine" : true,
        "createdDate": "2024-02-18 07:53:23.795698",
        "lastModifyDate": "2024-02-18 07:53:23.795698"
      },
    ],
  },
    reducers: {
      setCardList(state,action) {
        state.list = action.payload;
      },
    }
});

export const { setCardList } = cardListSlice.actions;
export default cardListSlice.reducer;