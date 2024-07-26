import { configureStore } from '@reduxjs/toolkit';
import navBarBtnReducer from './slices/navBarBtnSlice';
import mainBtnReducer from './slices/mainBtnSlice';

const store = configureStore({
  reducer: {
    navBarBtn: navBarBtnReducer,
    mainBtn: mainBtnReducer
  }
});

export default store;