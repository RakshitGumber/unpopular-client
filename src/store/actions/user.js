import * as api from "../../api";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: "LOGIN", data });

    navigate("../home");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: "SIGNUP", data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: "GET", data });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, formData);
    if (!data) {
      throw new Error("No data recieved");
    }
  } catch (error) {
    console.log(error);
  }
};
