const postReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, post: action?.payload };
    case "CREATE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default postReducer;
