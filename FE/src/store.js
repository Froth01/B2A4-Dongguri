import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import navBarBtnReducer from './slices/navBarBtnSlice';
import mainBtnReducer from './slices/mainBtnSlice';
import genreBtnReducer from './slices/genreBtnSlice';
import circleBtnReducer from './slices/circleBtnSlice';

// Persist config 설정
const persistConfig = {
  key: 'root',
  storage,
};

// persist reducer 설정
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    navBarBtn: navBarBtnReducer,
    mainBtn: mainBtnReducer,
    genreBtn: genreBtnReducer,
    circleBtn: circleBtnReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
export default store;
