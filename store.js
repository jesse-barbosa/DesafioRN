import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import repositoriesReducer from './slices/repositoriesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    repositories: repositoriesReducer,
  },
});

export default store;
