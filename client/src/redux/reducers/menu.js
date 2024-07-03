const menuReducer = (state = { menuListToggle: false }, action) => {
  switch (action.type) {
    case "MENU_LIST_TOGGLE":
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};

export default menuReducer;
