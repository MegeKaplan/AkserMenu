import { toast } from "react-toastify";

const toastifyConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const menuListAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "MENU_LIST_TOGGLE", payload: data });
  } catch (error) {
    toast.warning(error.response.data.msg, toastifyConfig);
  }
};
