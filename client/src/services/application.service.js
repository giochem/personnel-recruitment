import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `/api/applications`;

export const findApplicationsPublic = createAsyncThunk('applications/findApplicationsPublic', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const findApplicationById = createAsyncThunk(
  'applications/findApplicationById',
  async (applicationId, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + `/${applicationId}`);
      return res.data;
    } catch (error) {
      const message = error.response.data || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const findApplicationsOfUser = createAsyncThunk('applications/findApplicationsOfUser', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL + `/me`);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const createApplication = createAsyncThunk('applications/createApplication', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL + `/me`, data);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteApplication = createAsyncThunk('applications/deleteApplication', async (applicationId, thunkAPI) => {
  try {
    const res = await axios.delete(API_URL + `/me/${applicationId}`);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
