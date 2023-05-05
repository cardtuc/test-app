import { configureStore } from '@reduxjs/toolkit';
import launchReducer from './reducers';

export const store = configureStore({
  reducer: {
    launch: launchReducer
  }
});
