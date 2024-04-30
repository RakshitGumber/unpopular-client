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

export const createPost = (post) => async (dispatch) => {
  try {
    const response = await api.createPost(post);

    if (response && response.data) {
      dispatch({ type: "CREATE", payload: response.data });
    } else {
      console.log("Response data is missing or undefined:", response);
    }
  } catch (error) {
    console.log(error);
  }
};
