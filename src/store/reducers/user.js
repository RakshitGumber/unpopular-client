const userReducer = (state = { userData: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, userData: action?.data };
    case "SIGNUP":
      return { ...state, userData: action?.data };
    case "GET":
      return { ...state, userData: action?.data };
    case "UPDATE_USER":
      return state.map((userData) =>
        userData._id === action.data._id
          ? { ...userData, ...action.data }
          : userData
      );
    default:
      return state;
  }
};

export default userReducer;
