import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `/api/votes`;

export const findVotesOfResume = createAsyncThunk('votes/findVotesOfResume', async (resumeId, thunkAPI) => {
  try {
    const res = await axios.get(API_URL + `/${resumeId}`);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const createVote = createAsyncThunk('votes/createVote', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL + `/${data.params}`, data.body);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const updateVote = createAsyncThunk('votes/updateVote', async (data, thunkAPI) => {
  try {
    const res = await axios.put(API_URL + `/${data.params}`, data.body);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteVote = createAsyncThunk('votes/deleteVote', async (voteId, thunkAPI) => {
  try {
    const res = await axios.delete(API_URL + `/${voteId}`);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
