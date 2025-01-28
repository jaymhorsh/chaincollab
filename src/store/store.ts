import { configureStore } from '@reduxjs/toolkit';
import streamReducer from '../features/streamSlice';

const store = configureStore({
  reducer: {
    streams: streamReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
