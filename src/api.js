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
