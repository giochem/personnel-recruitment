import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `/api/resumes`;

export const findResumesPublic = createAsyncThunk('resumes/resumesPublic', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);

    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const findResume = createAsyncThunk('resumes/findResume', async (resumeId, thunkAPI) => {
  try {
    const res = await axios.get(`/api/resumes/${resumeId}`);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const createResume = createAsyncThunk('resumes/createResume', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL + `/me`, data);

    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const findResumesOfUser = createAsyncThunk('resumes/findResumeOfUser', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL + `/me`);

    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateResume = createAsyncThunk('resumes/updateResume', async (data, thunkAPI) => {
  try {
    const res = await axios.put(API_URL + `/me/${data.resumeId}`, data.resume);

    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteResume = createAsyncThunk('resumes/deleteResume', async (resumeId, thunkAPI) => {
  try {
    const res = await axios.delete(API_URL + `/me/${resumeId}`);

    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
