import { createSlice } from "@reduxjs/toolkit";
import { getRooms } from "../actions/messagesActions";

const initialState = {
  loading: false,
  rooms: [],
  error: null,
  success: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    // * Get Rooms
    builder.addCase(getRooms.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.rooms = [];
    });
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = [...state.rooms, ...action.payload];
      state.success = "roomsFetchSuccess";
    });
    builder.addCase(getRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default messageSlice.reducer;
