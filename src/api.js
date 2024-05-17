import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const login = (data) => API.post("/user/login", data);

export const signup = (data) => API.post("/user/signup", data);

export const getUser = (id) => API.get(`/user/${id}`);

export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);

export const getFriendList = (id) => API.get(`/user/${id}/followers`);

export const getFollowingList = (id) => API.get(`/user/${id}/followings`);

export const getPendingRequest = (id) =>
  API.get(`/user/${id}/followers/requests`);

export const searchUser = (id, query) =>
  API.get(`/user/${id}/followers/search?search=${query}`);

export const sendRequest = (id, userId) =>
  API.post(`/user/${id}/followers/requests`, { userId });

export const rejectRequest = (id, requestorId) =>
  API.post(`/user/${id}/followers/requests/reject`, { requestorId });

export const acceptRequest = (id, requestorId) =>
  API.post(`/user/${id}/followers/requests/accept`, { requestorId });

export const removeFollower = (id, userId) =>
  API.post(`/user/${id}/followers/remove`, { userId });

export const removeFollowing = (id, userId) =>
  API.post(`/user/${id}/followings/remove`, { userId });

export const getPosts = () => API.get("/posts");

export const getPost = (id) => API.get(`/posts/${id}`);

export const createPost = (data) => API.post("/posts", data);

export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);

export const likePost = (id, userId) =>
  API.patch(`/posts/${id}/like`, { userId });

export const dislikePost = (id, userId) => {
  API.patch(`/posts/${id}/dislike`, { userId });
};

export const getRooms = () => API.get("/chat");

export const searchPosts = (query) =>
  API.get(`/posts/search?searchQuery=${query}`);

export const deletePost = (id) => API.delete(`/posts/${id}`);
