import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import navBarBtnReducer from './slices/navBarBtnSlice';
import mainBtnReducer from './slices/mainBtnSlice';
import genreBtnReducer from './slices/genreBtnSlice';
import circleBtnReducer from './slices/circleBtnSlice';
import userInfoReducer from './slices/userInfoSlice';
import guideReducer from './slices/guideSlice';
import makeStoryReducer from './slices/makeStorySlice';

import pathHistoryReducer from './slices/pathHistorySlice';

import imgReducer from './slices/imgSlice';
import followingReducer from './slices/followingSlice';
import followersReducer from './slices/followersSlice';
import representativeReducer from './slices/representativeSlice';
import storyBookReducer from './slices/storyBookSlice';
// persist 설정
// const persistConfig = {
//   key: 'root', // 기본 키 이름
//   storage,     // localStorage를 사용
//   whitelist: ['auth', 'makeStory'] // 유지할 리듀서 설정 (예: userInfo)
// };

const authPersistConfig = {
  key: 'auth',
  storage,
};

const makeStoryPersistConfig = {
  key: 'makeStory',
  storage,
};

const pathHistoryPersistConfig = {
  key: 'pathHistory',
  storage,
};

const representativePersistConfig = {
  key: 'representative',
  storage,
};

const storyBookPersistConfig = {
  key: 'storybook',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, authReducer);
// const makeStoryPersistedReducer = persistReducer(persistConfig, makeStoryReducer);

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedMakeStoryReducer = persistReducer(makeStoryPersistConfig, makeStoryReducer);
const persistedPathHistroyReducer = persistReducer(pathHistoryPersistConfig, pathHistoryReducer);
const persistedRepresentativeReducer = persistReducer(representativePersistConfig, representativeReducer)
const persistedStoryBookReducer = persistReducer(storyBookPersistConfig, storyBookReducer)
// persist reducer 설정

const store = configureStore({
  reducer: {
    navBarBtn: navBarBtnReducer,
    mainBtn: mainBtnReducer,
    genreBtn: genreBtnReducer,
    circleBtn: circleBtnReducer,
    userInfo: userInfoReducer,
    auth: persistedAuthReducer, 
    // auth: persistedReducer,    // persistor를 적용한 리듀서 사용
    guide: guideReducer,
    makeStory: persistedMakeStoryReducer,
    pathHistory: persistedPathHistroyReducer,
    // makeStory: makeStoryReducer,
    image: imgReducer, 
    following: followingReducer,
    followers: followersReducer,
    representative : persistedRepresentativeReducer,
    storyBook : persistedStoryBookReducer,
  },  
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {   // 직렬화 가능성 검사
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // 직렬화 가능성 검사 제외 액션 타입 지정
    },
  }),
});

// persistor를 만들어서 store와 함께 export
export const persistor = persistStore(store);
export default store;
