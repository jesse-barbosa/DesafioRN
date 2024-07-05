import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepositories } from './repositoriesSlice';

export const fetchUser = createAsyncThunk('user/fetchUser', async (username, { dispatch }) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    dispatch(fetchRepositories(username));
    return data;
  } catch (error) {
    throw Error('Failed to fetch user data');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
