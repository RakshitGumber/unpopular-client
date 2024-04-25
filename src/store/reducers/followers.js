const friendsReducer = (
  state = { friendsData: null, searchResults: [] },
  action
) => {
  switch (action.type) {
    case "GET_FRIENDS":
      return { ...state, friendsData: action?.data };
    case "GET_REQUEST":
      return { ...state, friendsData: action?.data };
    case "GET_FOLLOWINGS":
      return { ...state, friendsData: action?.data };
    case "FIND_USER":
      return { ...state, searchResults: action?.data };
    default:
      return state;
  }
};

export default friendsReducer;
