import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `/api/users`;

export const findUser = createAsyncThunk('users/findUser', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const updateUser = createAsyncThunk('users/updateUser', async (update, thunkAPI) => {
  try {
    const res = await axios.put(API_URL, update);
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('users/register', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL, data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
export const login = createAsyncThunk('users/login', async (data, thunkAPI) => {
  try {
    const res = await axios.post(API_URL + `/login`, data);

    localStorage.setItem('user', JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log('🚀 ~ file: user.service.js ~ line 23 ~ login ~ error', error);
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const res = await axios.delete(API_URL);
    localStorage.removeItem('user');
    return res.data;
  } catch (error) {
    const message = error.response.data || error;
    return thunkAPI.rejectWithValue(message);
  }
});
