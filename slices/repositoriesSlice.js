import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRepositories = createAsyncThunk('repositories/fetchRepositories', async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    const data = await response.json();
    const userEmail = findUserEmail(data);
    return { eventsData: data, userEmail };
  } catch (error) {
    throw Error('Failed to fetch user events');
  }
});

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    userEmail: null,
  },
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.eventsData;
        state.userEmail = action.payload.userEmail;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setOrderBy } = repositoriesSlice.actions;

export default repositoriesSlice.reducer;

function findUserEmail(eventsData) {
  for (let event of eventsData) {
    if (event.payload && event.payload.commits && event.payload.commits[0] && event.payload.commits[0].author && event.payload.commits[0].author.email) {
      return event.payload.commits[0].author.email;
    }
  }
  return null;
}
