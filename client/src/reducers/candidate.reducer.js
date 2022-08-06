import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { findCandidatesOfApplication, createCandidate } from '../services/candidate.service';

const initialState = {
  candidates: [],
  isError: false,
  isLoading: false,
  message: '',
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates.push(action.payload);
      })
      .addMatcher(isAnyOf(findCandidatesOfApplication.fulfilled), (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload;
      })
      .addMatcher(isAnyOf(findCandidatesOfApplication.pending, createCandidate.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(findCandidatesOfApplication.rejected, createCandidate.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = candidateSlice.actions;
export default candidateSlice.reducer;
