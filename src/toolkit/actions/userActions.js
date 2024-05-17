import * as api from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.signup(formData);
      return data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.login(formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.getUser(id);
      return data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await api.updateUser(id, formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
