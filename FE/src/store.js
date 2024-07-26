import { configureStore } from '@reduxjs/toolkit';
import imgUrlReducer from './slices/imgUrlSlice';
import mainnBtnReducer from './slices/mainBtnSlice';

const store = configureStore({
  reducer: {
    imgUrl: imgUrlReducer,
    mainBtn: mainnBtnReducer
  }
});

export default store;