import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import navBarBtnReducer from './slices/navBarBtnSlice';
import mainBtnReducer from './slices/mainBtnSlice';
import genreBtnReducer from './slices/genreBtnSlice';
import circleBtnReducer from './slices/circleBtnSlice';
import userInfoReducer from './slices/userInfoSlice';

// persist 설정
const persistConfig = {
  key: 'root', // 기본 키 이름
  storage,     // localStorage를 사용
  whitelist: ['userInfo'] // 유지할 리듀서 설정 (예: userInfo)
};

const persistedReducer = persistReducer(persistConfig, userInfoReducer);

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
    userInfo: persistedReducer, // persistor를 적용한 리듀서 사용
  },
});

// persistor를 만들어서 store와 함께 export
export const persistor = persistStore(store);
export default store;
