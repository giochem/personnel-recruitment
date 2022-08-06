import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  findApplicationsPublic,
  findApplicationById,
  findApplicationsOfUser,
  createApplication,
  deleteApplication,
} from '../services/application.service';

const initialState = {
  applications: [],
  isError: false,
  isLoading: false,
  message: '',
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.push(action.payload);
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter((application) => application._id !== action.payload._id);
      })
      .addMatcher(
        isAnyOf(findApplicationsPublic.fulfilled, findApplicationById.fulfilled, findApplicationsOfUser.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.applications = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          findApplicationsPublic.pending,
          findApplicationById.pending,
          findApplicationsOfUser.pending,
          createApplication.pending,
          deleteApplication.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          findApplicationsPublic.rejected,
          findApplicationById.rejected,
          findApplicationsOfUser.rejected,
          createApplication.rejected,
          deleteApplication.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});
export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
