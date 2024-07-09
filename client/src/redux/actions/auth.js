import axios from "axios";
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

export const registerAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      authData
    );

    dispatch({ type: "REGISTER", payload: data });

    toast.success(data.msg, toastifyConfig);

    setTimeout(() => {
      window.location = "/admin";
    }, toastifyConfig.autoClose);
  } catch (error) {
    toast.warning(error.response.data.msg, toastifyConfig);
  }
};

export const loginAction = (authData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      authData
    );

    dispatch({ type: "LOGIN", payload: data });

    toast.success(data.msg, toastifyConfig);

    setTimeout(() => {
      window.location = "/admin";
    }, toastifyConfig.autoClose);
  } catch (error) {
    toast.warning(error.response.data.msg, toastifyConfig);
  }
};
