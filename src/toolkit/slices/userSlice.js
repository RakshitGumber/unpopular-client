import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  getUser,
  updateUser,
  followUser,
} from "../actions/userActions";

const initialState = {
  loading: false, // Data is loading or not
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null, // Ofcourse for error monitoring
  success: false, // for monitoring the registration process.
  userGet: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // *  SignUp Cases
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * Login Cases
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * GetUser Cases
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.userGet = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userGet = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * UpdateUser Cases
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * Send Follow Request Cases
    builder.addCase(followUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingFollowing = [...state.pendingFollowing, action.payload];
      state.success = "sendRequestSuccess";
    });
    builder.addCase(followUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
