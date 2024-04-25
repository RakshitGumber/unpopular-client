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
