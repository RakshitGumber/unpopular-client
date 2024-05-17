import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getPosts,
  getPost,
  likePost,
  dislikePost,
  searchPost,
  updatePost,
  deletePost,
} from "../actions/postActions";

const initialState = {
  loading: false,
  posts: [],
  draft: null,
  error: null,
  success: null,
  searchResults: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    saveDraft: (state, action) => {
      state.draft = action.payload;
    },
    resetPostState: (state) => {
      state.success = null;
      state.error = null;
      state.loading = false;
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

    // * UpdatePost Cases
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.forEach((post) => {
        if (post._id === action.payload._id) {
          post = action.payload;
        }
      });
      state.success = "postUpdateSuccess";
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = "postUpdateError";
    });

    // * Get Post Cases
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.posts = [];
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.success = "postFetchSuccess";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
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
      state.success = "onePostFetchSuccess";
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

    // * Delete Post Cases
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.filter((post) => post._id !== action.payload);
      state.success = "postDeleteSuccess";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = "postDeleteError";
    });

    // TODO: Get Search User
    builder.addCase(searchPost.pending, (state) => {
      state.loading = true;
      state.searchResults = [];
      state.error = null;
      state.success = null;
    });
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload ?? [];
    });
    builder.addCase(searchPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveDraft, resetPostState } = postSlice.actions;

export default postSlice.reducer;
