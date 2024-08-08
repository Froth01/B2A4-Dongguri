import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteStorybook } from '../Api/api';

export const removeStorybook = createAsyncThunk(
  'storybooks/removeStorybook',
  async (storybookId, { rejectWithValue }) => {
    try {
      await deleteStorybook(storybookId);
      return storybookId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const storybookSlice = createSlice({
  name: 'storybooks',
  initialState: {
    storybooks: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // Your existing reducers...
  },
  extraReducers: (builder) => {
    builder
      // Your existing extra reducers...
      .addCase(removeStorybook.fulfilled, (state, action) => {
        state.storybooks = state.storybooks.filter(storybook => storybook.id !== action.payload);
      });
  }
});

export default storybookSlice.reducer;
