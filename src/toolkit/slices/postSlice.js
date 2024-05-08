import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getPost,
  likePost,
  dislikePost,
} from "../actions/postActions";

const initialState = {
  loading: false,
  posts: [],
  draft: null,
  error: null,
  success: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    saveDraft: (state, action) => {
      state.draft = action.payload;
    },
  },
  extraReducers: (builder) => {
    // * CreatePost Cases
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
      state.success = "postCreateSuccess";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * Get Post Cases
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.posts = [];
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.success = "postFetchSuccess";
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * Like Post Cases
    builder.addCase(likePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.forEach((post) => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
      });
      state.success = "postLikeSuccess";
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // * Dislike Post Cases
    builder.addCase(dislikePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(dislikePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.forEach((post) => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
      });
      state.success = "postDislikeSuccess";
    });
    builder.addCase(dislikePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveDraft } = postSlice.actions;

export default postSlice.reducer;
