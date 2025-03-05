import { configureStore } from '@reduxjs/toolkit';
import streamReducer from '../features/streamSlice';
import assetsReducer from '../features/assetsSlice';

const store = configureStore({
  reducer: {
    streams: streamReducer,
    assets: assetsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
