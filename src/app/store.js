import { configureStore } from '@reduxjs/toolkit';
import subredditsSlice from '../features/subreddits/subredditsSlice';
import redditsSlice from '../features/reddits/redditsSlice';

export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
    reddits: redditsSlice
  }
});
