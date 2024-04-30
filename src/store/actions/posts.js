import * as api from "../../api";

export const getPost = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: "FETCH", payload: data });
    return data;
  } catch (error) {
    console.log(error);
  }
};
