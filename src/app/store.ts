import { configureStore } from '@reduxjs/toolkit';
import streamReducer from '../features/streamSlice';

export const store = configureStore({
  reducer: {
    stream: streamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
