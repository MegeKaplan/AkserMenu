import { Client, Databases, ID, Query } from "node-appwrite";
import initConfig from "../initConfig.js";

initConfig();

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID);
// .setKey(config.APPWRITE_API_KEY)

const databases = new Databases(client);

const isValidEmail = async (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("email", email)]
  );

  return regex.test(email) && response.total === 0;
};

export const register = async (req, res) => {
  try {
    const { email, username, password, menuId } = {
      ...req.body,
      menuId: process.env.MENU_ID,
    };

    if (!(await isValidEmail(email))) {
      return res.status(500).json({
        msg: "Email is not valid!",
      });
    }

    if (password.length <= 3) {
      return res.status(500).json({
        msg: "Password is must be have more than 3 characters!",
      });
    }

    const userData = { email, username, password, menuId };

    const promise = await databases
      .createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        userData
      )
      .then(
        function (response) {
          console.log("success");
          return response;
        },
        function (error) {
          console.log("error");
          return error;
        }
      );

    res.status(201).json({
      status: "OK",
      promise,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const isUserAvailable = async (email) => {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("email", email)]
  );

  return response.total > 0;
};

export const login = async (req, res) => {
  try {
    const { email, username, password, menuId } = {
      ...req.body,
      menuId: process.env.MENU_ID,
    };

    console.log(await isUserAvailable(email));

    if (!(await isUserAvailable(email))) {
      return res.status(500).json({
        msg: "User not found!",
      });
    }

    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_COLLECTION_ID,
      [Query.equal("email", email), Query.equal("password", password)]
    );

    if (response.total === 0) {
      return res.status(500).json({
        msg: "Password is wrong!",
      });
    }

    res.status(201).json({
      status: "OK",
      response,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
