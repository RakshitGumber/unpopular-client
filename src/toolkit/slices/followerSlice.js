import { createSlice } from "@reduxjs/toolkit";
import {
  getFollowerList,
  getPendingRequest,
  getFollowingList,
  searchUser,
  sendRequest,
  rejectRequest,
  removeFollower,
  removeFollowing,
  acceptRequest,
} from "../actions/followerActions";

const initialState = {
  loading: false,
  followers: [],
  following: [],
  incoming: [],
  outgoing: [],
  searchResults: [],
  error: null,
  success: null,
};

export const followerSlice = createSlice({
  name: "follower",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // TODO: Get Friend List
    builder.addCase(getFollowerList.pending, (state) => {
      state.followers = [];
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(getFollowerList.fulfilled, (state, action) => {
      state.loading = false;
      state.followers = action.payload;
    });
    builder.addCase(getFollowerList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Get Pending Request
    builder.addCase(getPendingRequest.pending, (state) => {
      state.loading = true;
      state.outgoing = [];
      state.error = null;
      state.success = null;
    });
    builder.addCase(getPendingRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.outgoing = action.payload;
    });
    builder.addCase(getPendingRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Get Following List
    builder.addCase(getFollowingList.pending, (state) => {
      state.loading = true;
      state.following = [];
      state.error = null;
      state.success = null;
    });
    builder.addCase(getFollowingList.fulfilled, (state, action) => {
      state.loading = false;
      state.following = action.payload;
    });
    builder.addCase(getFollowingList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Get Search User
    builder.addCase(searchUser.pending, (state) => {
      state.loading = true;
      state.searchResults = [];
      state.error = null;
      state.success = null;
    });
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(searchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Send Request
    builder.addCase(sendRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(sendRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(sendRequest.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // TODO: Reject Request
    builder.addCase(rejectRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(rejectRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(rejectRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Accept Request
    builder.addCase(acceptRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(acceptRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Remove Follower

    builder.addCase(removeFollower.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(removeFollower.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(removeFollower.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // TODO: Remove Following
    builder.addCase(removeFollowing.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(removeFollowing.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(removeFollowing.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default followerSlice.reducer;
