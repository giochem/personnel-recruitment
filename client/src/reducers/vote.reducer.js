import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { findVotesOfResume, createVote, updateVote, deleteVote } from '../services/vote.service';

const initialState = {
  votes: [],
  isError: false,
  isLoading: false,
  message: '',
};

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.votes.push(action.payload);
      })
      .addCase(updateVote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.votes.push(action.payload);
      })
      .addCase(deleteVote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.votes = state.votes.filter((vote) => vote._id !== action.payload._id);
      })
      .addMatcher(isAnyOf(findVotesOfResume.fulfilled), (state, action) => {
        state.isLoading = false;
        state.votes = action.payload;
      })
      .addMatcher(
        isAnyOf(findVotesOfResume.pending, createVote.pending, updateVote.pending, deleteVote.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(findVotesOfResume.rejected, createVote.rejected, updateVote.rejected, deleteVote.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      );
  },
});
export const { reset } = voteSlice.actions;
export default voteSlice.reducer;
