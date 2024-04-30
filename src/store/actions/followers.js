import * as api from "../../api";

export const getFriendList = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFriendList(id);
    dispatch({ type: "GET_FRIENDS", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPendingRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPendingRequest(id);
    dispatch({ type: "GET_REQUEST", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingList = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFollowingList(id);
    dispatch({ type: "GET_FOLLOWINGS", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = (id, query) => async (dispatch) => {
  try {
    const { data } = await api.searchUser(id, query);
    dispatch({ type: "FIND_USER", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendRequest = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.sendRequest(id, userId);
    dispatch({ type: "SEND_REQ", data });
  } catch (error) {
    console.log(error);
  }
};

export const rejectRequest = (id, requestorId) => async (dispatch) => {
  try {
    const { data } = await api.rejectRequest(id, requestorId);
    dispatch({ type: "REJECT_REQ", data });
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = (id, requestorId) => async (dispatch) => {
  try {
    const { data } = await api.acceptRequest(id, requestorId);
    dispatch({ type: "ACCEPT_REQ", data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFollower = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.removeFollower(id, userId);
    dispatch({ type: "REMOVE_FOLLOWER" }, data);
  } catch (error) {
    console.log(error);
  }
};
export const removeFollowing = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.removeFollowing(id, userId);
    dispatch({ type: "REMOVE_FOLLOWING" }, data);
  } catch (error) {
    console.log(error);
  }
};
