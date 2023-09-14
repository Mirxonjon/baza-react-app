import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const showUser = createAsyncThunk(
  'showUser',
  async (args, { rejectWithValue }) => {
    const response = await fetch('http://localhost:3000/users');

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//create action
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
//delete action
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    });

    try {
      const result = await response.json();
      return { id };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:3000/users/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  loading: false,
  users: [],
  dateForSort: [],
  error: null,
};

export const { actions: userActionst, reducer: userReducers } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sortUser: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: {
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.dateForSort = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.dateForSort.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((e) => e.id !== id);
        state.dateForSort = state.dateForSort.filter((e) => e.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
      state.dateForSort = state.dateForSort.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
