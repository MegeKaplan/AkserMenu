import { Client, Databases, ID, Query } from "node-appwrite";
import initConfig from "../initConfig.js";

initConfig();

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);
// .setKey(config.APPWRITE_API_KEY)

const databases = new Databases(client);

const getItemsFunc = async () => {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    process.env.MENU_ID
    // [Query.equal("type", "category")]
  );

  return response;
};

export const getItems = async (req, res) => {
  try {
    const response = await getItemsFunc();

    const items = response.documents

    const categories = items.filter(item => item.type.toString() === "category")
    const products = items.filter(item => item.type.toString() === "product")

    const menu = categories.map(category => {
      return {
        ...category,
        products: products.filter(product => product.category === category.$id)
      };
    });

    res.status(201).json({
      status: "OK",
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const getItem = async (req, res) => {
  // try {
  //   const response = await databases.listDocuments(
  //     process.env.APPWRITE_DATABASE_ID,
  //     process.env.MENU_ID
  //   );

  //   res.status(201).json({
  //     status: "OK",
  //     response,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     msg: error.message,
  //   });
  // }
  res.status(200);
};

export const addItem = async (req, res) => {
  try {
    const { type, name, price, category } = req.body;

    if (name.length == "") {
      return res.status(500).json({
        msg: "Name is cannot be empty!",
      });
    }

    if (type == "product" && Number(price) <= 0) {
      return res.status(500).json({
        msg: "Price should be more!",
      });
    }

    var docData;
    if (type === "category") {
      docData = { type, name, imageUrl: "" };
    } else {
      docData = { type, name, price, category };
    }

    const promise = await databases
      .createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.MENU_ID,
        ID.unique(),
        docData
      )
      .then(
        (response) => {
          console.log("success");
          return response;
        },
        (error) => {
          console.log("error");
          return error.message;
        }
      );

    res.status(201).json({
      status: "OK",
      data: { ...promise },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { type, name, price, imageUrl, category } = req.body;
    const docId = req.params.id;

    if (name.length == "") {
      return res.status(500).json({
        msg: "Name is cannot be empty!",
      });
    }

    if (type == "product" && Number(price) <= 0) {
      return res.status(500).json({
        msg: "Price should be more!",
      });
    }

    var updatedData;
    if (type === "category") {
      updatedData = { type, name, imageUrl: "" };
    } else {
      updatedData = { type, name, price, category };
    }

    const promise = await databases
      .updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.MENU_ID,
        docId,
        updatedData
      )
      .then(
        (response) => {
          console.log("success");
          return response;
        },
        (error) => {
          console.log("error");
          return error.message;
        }
      );

    res.status(201).json({
      status: "OK",
      data: { ...promise },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const docId = req.params.id;

    const promise = await databases
      .deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.MENU_ID,
        docId
      )
      .then(
        (response) => {
          console.log("success");
          return response;
        },
        (error) => {
          console.log("error");
          return error.message;
        }
      );

    res.status(201).json({
      status: "OK",
      data: { ...promise },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
