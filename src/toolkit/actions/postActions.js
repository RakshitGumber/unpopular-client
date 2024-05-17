import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const createPost = createAsyncThunk(
  "posts/create",
  async (post, { rejectWithValue }) => {
    try {
      const { data } = await api.createPost(post);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.getPosts();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.getPosts(id);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const searchPost = createAsyncThunk(
  "posts/search",
  async ({ query }, { rejectWithValue }) => {
    try {
      const { data } = await api.searchPosts(query);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.likePost(postId, userId);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislike",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await api.dislikePost(postId, userId);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await api.deletePost(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/edit",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const { data } = await api.updatePost(id, post);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
