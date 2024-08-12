// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { deleteStorybook } from '../Api/api';

// // Thunk 생성
// // export const removeStorybook = createAsyncThunk(
// //   'storyBook/removeStorybook',
// //   async (storybookId, thunkAPI) => {
// //     try {
// //       await deleteStorybook(storybookId);
// //       return storybookId; // 삭제된 storybookId 반환
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.response.data);
// //     }
// //   }
// // );


// export const removeStorybook = createAsyncThunk(
//   'reactions/removeStorybook',
//   async ({storybookId}) => {
//     console.log('slice 동화 삭제',storybookId)
//     const response = await deleteStorybook(storybookId);
//     return response;
//   }
// );

// const initialState = {
//   genre: '',
//   keywords: ['', '', '', ''],
//   content: '',
//   originalImageUrl: '',
//   transformedImageUrl: '',
//   voiceRecordingFile: '',
// };

// const storyBookSlice = createSlice({
//   name: 'storyBook',
//   initialState,
//   reducers: {
//     setGenre(state, action) {
//       state.genre = action.payload;
//     },
//     setKeywords(state, action) {
//       state.keywords = action.payload;
//     },
//     setContent(state, action) {
//       state.content = action.payload;
//     },
//     setOriginalImageUrl(state, action) {
//       state.originalImageUrl = action.payload;
//     },
//     setTransformedImageUrl(state, action) {
//       state.transformedImageUrl = action.payload;
//     },
//     setVoiceRecordingFile(state,action) {
//       state.voiceRecordingFile =action.payload
//     },
//     clearStorybook() {
//       return initialState;  // 초기 상태로 되돌립니다.
//     },
//     // 삭제
//     removeStorybookFromList(state, action) {
//       state.storybooks = state.storybooks.filter(book => book.id !== action.payload);
//     },
//     // 삭제
//     extraReducers: (builder) => {
//       builder
//         .addCase(removeStorybook.fulfilled, (state, action) => {
//           state.storybooks = state.storybooks.filter(book => book.id !== action.payload);
//           console.log(`Storybook with ID ${action.payload} has been deleted`);
//         })
//         .addCase(removeStorybook.rejected, (state, action) => {
//           console.error('Failed to delete storybook:', action.payload);
//         });
//     },
//   }
// });

// // actions
// export const { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl, setVoiceRecordingFile, clearStorybook } = storyBookSlice.actions;

// // selectors
// export const selectStorybook = (state) => state.storyBook;
// export const selectVoiceRecordingFile = (state) => state.storyBook.voiceRecordingFile;

// export default storyBookSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStorybook, fetchStoryBooks } from '../Api/api'; // fetchStoryBooks 추가

// Thunk 생성
export const fetchStoryBooksThunk = createAsyncThunk(
  'storyBook/fetchStoryBooksThunk',
  async (storybookData, thunkAPI) => {
    try {
      const response = await fetchStoryBooks(storybookData); // 동화 생성 API 호출
      return response.data; // 응답 데이터 반환 (생성된 동화의 ID 포함)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeStorybook = createAsyncThunk(
  'reactions/removeStorybook',
  async ({storybookId}) => {
    console.log('slice 동화 삭제',storybookId)
    const response = await deleteStorybook(storybookId);
    return response;
  }
);

const initialState = {
  genre: '',
  keywords: ['', '', '', ''],
  content: '',
  originalImageUrl: '',
  transformedImageUrl: '',
  voiceRecordingFile: '',
  storybooks: [],  // 생성된 동화 리스트
};

const storyBookSlice = createSlice({
  name: 'storyBook',
  initialState,
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },
    setKeywords(state, action) {
      state.keywords = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setOriginalImageUrl(state, action) {
      state.originalImageUrl = action.payload;
    },
    setTransformedImageUrl(state, action) {
      state.transformedImageUrl = action.payload;
    },
    setVoiceRecordingFile(state, action) {
      state.voiceRecordingFile = action.payload;
    },
    clearStorybook() {
      return initialState;  // 초기 상태로 되돌립니다.
    },
    // 삭제
    removeStorybookFromList(state, action) {
      state.storybooks = state.storybooks.filter(book => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryBooksThunk.fulfilled, (state, action) => {
        state.storybooks.push(action.payload);  // 생성된 동화 데이터를 스토어에 추가
        console.log(`Storybook with ID ${action.payload.storybookId} has been created`);
      })
      .addCase(fetchStoryBooksThunk.rejected, (state, action) => {
        console.error('Failed to create storybook:', action.payload);
      })
      .addCase(removeStorybook.fulfilled, (state, action) => {
        state.storybooks = state.storybooks.filter(book => book.id !== action.payload);
        console.log(`Storybook with ID ${action.payload} has been deleted`);
      })
      .addCase(removeStorybook.rejected, (state, action) => {
        console.error('Failed to delete storybook:', action.payload);
      });
  }
});

// actions
export const { setGenre, setKeywords, setContent, setOriginalImageUrl, setTransformedImageUrl, setVoiceRecordingFile, clearStorybook } = storyBookSlice.actions;

// selectors
export const selectStorybook = (state) => state.storyBook;
export const selectVoiceRecordingFile = (state) => state.storyBook.voiceRecordingFile;

export default storyBookSlice.reducer;


