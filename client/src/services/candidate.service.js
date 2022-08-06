import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `/api/candidates`;

export const findCandidatesOfApplication = createAsyncThunk(
  'applications/findCandidateOfApplication',
  async (applicationId, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + `/me/${applicationId}`);
      return res.data;
    } catch (error) {
      const message = error.response.data || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createCandidate = createAsyncThunk('applications/createCandidate', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL + '/me', data);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
