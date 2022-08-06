import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  findResumesPublic,
  findResume,
  createResume,
  findResumesOfUser,
  updateResume,
  deleteResume,
} from '../services/resume.service';

const initialState = {
  resumes: [],
  isError: false,
  isLoading: false,
  message: '',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resumes.push(action.payload);
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resumes = state.resumes.map((resume) => (resume._id === action.payload._id ? action.payload : resume));
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resumes = state.resumes.filter((resume) => resume._id !== action.payload._id);
      })
      .addMatcher(
        isAnyOf(
          findResumesOfUser.pending,
          findResumesPublic.pending,
          findResume.pending,
          createResume.pending,
          updateResume.pending,
          deleteResume.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          findResumesOfUser.rejected,
          findResumesPublic.rejected,
          findResume.rejected,
          createResume.rejected,
          updateResume.rejected,
          deleteResume.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(findResumesOfUser.fulfilled, findResumesPublic.fulfilled, findResume.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.resumes = action.payload;
        }
      );
  },
});
export const { reset } = resumeSlice.actions;
export default resumeSlice.reducer;
