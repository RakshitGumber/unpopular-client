import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const getRooms = createAsyncThunk(
  "message/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.getRooms();
      return data.rooms;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
