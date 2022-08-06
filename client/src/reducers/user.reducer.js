import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { register, login, logout, findUser, updateUser } from '../services/user.service';

const auth = localStorage.getItem('user');

const initialState = {
  auth: JSON.parse(auth) || null,
  isError: false,
  isLoading: false,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.auth = null;
      })
      .addMatcher(
        isAnyOf(register.pending, login.pending, logout.pending, findUser.pending, updateUser.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled, findUser.fulfilled, updateUser.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.auth = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(register.rejected, login.rejected, logout.rejected, findUser.rejected, updateUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
