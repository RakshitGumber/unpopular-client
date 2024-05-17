import * as api from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFollowerList = createAsyncThunk(
  "people/getFollower",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.getFriendList(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPendingRequest = createAsyncThunk(
  "people/getPending",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.getPendingRequest(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFollowingList = createAsyncThunk(
  "people/getFollowing",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.getFollowingList(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchUser = createAsyncThunk(
  "people/search",
  async ({ id, query }, { rejectWithValue }) => {
    try {
      const { data } = await api.searchUser(id, query);
      return data.users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendRequest = createAsyncThunk(
  "people/sendReq",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.sendRequest(id, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rejectRequest = createAsyncThunk(
  "people/rejectReq",
  async ({ id, requestorId }, { rejectWithValue }) => {
    try {
      const { data } = await api.rejectRequest(id, requestorId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "people/acceptReq",
  async ({ id, requestorId }, { rejectWithValue }) => {
    try {
      const { data } = await api.acceptRequest(id, requestorId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFollower = createAsyncThunk(
  "people/removeFollower",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const data = await api.removeFollower(id, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFollowing = createAsyncThunk(
  "people/removeFollowing",
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.removeFollowing(id, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
