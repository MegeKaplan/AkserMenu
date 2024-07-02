const authReducer = (state = { auth: null }, action) => {
  switch (action.type) {
    case "REGISTER":
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        auth: null,
      };

    default:
      return state;
  }
};

export default authReducer;
