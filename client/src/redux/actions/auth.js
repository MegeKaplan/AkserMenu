import axios from "axios";
import { toast } from "react-toastify";
// import { Client, Databases, Permission, Role, ID } from "appwrite";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);
// // .setKey(config.APPWRITE_API_KEY)

// const databases = new Databases(client);

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

    // const collection = await databases.createCollection(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   ID.unique(),
    //   "tsetsttstd",
    //   [Permission.read(Role.any()), Permission.write(Role.any())]
    // );

    // console.log("C", collection);

    // await databases.createStringAttribute(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "name",
    //   64,
    //   true
    // );
    // await databases.createStringAttribute(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "type",
    //   32,
    //   true
    // );
    // await databases.createStringAttribute(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "imageUrl",
    //   1024,
    //   false
    // );
    // await databases.createIntegerAttribute(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "price",
    //   false
    // );
    // await databases.createStringAttribute(
    //   process.env.REACT_APP_APPWRITE_DATABASE_ID,
    //   collection.$id,
    //   "category",
    //   128,
    //   false
    // );

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
