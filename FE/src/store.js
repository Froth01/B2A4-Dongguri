import { configureStore } from '@reduxjs/toolkit';
import imgUrlReducer from './slices/imgUrlSlice';

const store = configureStore({
  reducer: {
    imgUrl: imgUrlReducer
  }
});

export default store;