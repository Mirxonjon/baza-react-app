import { configureStore } from '@reduxjs/toolkit';
import { userReducers } from './slice/users';

export const store = configureStore({
  reducer: {
    users: userReducers,
  },
});
