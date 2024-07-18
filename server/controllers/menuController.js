import {
  Client,
  Databases,
  ID,
  Query,
  Storage,
  InputFile,
} from "node-appwrite";
import initConfig from "../initConfig.js";

initConfig();

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);
// .setKey(config.APPWRITE_API_KEY)

const databases = new Databases(client);

const storage = new Storage(client);

const getItemsFunc = async (menuId) => {
  const response = await databases.listDocuments(
    process.env.APPWRITE_DATABASE_ID,
    // process.env.MENU_ID
    menuId
    // [Query.equal("type", "category")]
  );

  return response;
};

export const getItems = async (req, res) => {
  try {
    const response = await getItemsFunc(req.params.menuId);

    const items = response.documents;

    const categories = items.filter(
      (item) => item.type.toString() === "category"
    );
    const products = items.filter((item) => item.type.toString() === "product");

    const menu = categories.map((category) => {
      return {
        ...category,
        products: products.filter(
          (product) => product.category === category.$id
        ),
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
    const item = req.body;
    const file = req.file;
    const priceInt = Number(item.price);

    console.log(item);

    if (item.name.length == "") {
      return res.status(500).json({
        msg: "İsim boş bırakılamaz!",
      });
    }

    if (item.type == "product" && !(item.price > 0)) {
      return res.status(500).json({
        msg: "Fiyat sıfırdan daha fazla bir sayı olmalıdır!",
      });
    }

    if (item.type == "category") {
      try {
        const imageId = ID.unique();
        (item.imageUrl =
          process.env.APPWRITE_ENDPOINT +
          "/storage/buckets/" +
          process.env.APPWRITE_IMAGES_BUCKET +
          "/files/" +
          imageId +
          "/view?project=" +
          process.env.APPWRITE_PROJECT_ID),
          await storage
            .createFile(
              process.env.APPWRITE_IMAGES_BUCKET,
              imageId,
              InputFile.fromBuffer(file.buffer, item.name + ".png")
            )
            .then(
              async (response) => {
                console.log("file suc");
                console.log(response);
              },
              function (error) {
                console.log("file err");
                console.log(error);
              }
            );
      } catch (error) {
        console.log(error);
      }
    }

    var docData;
    if (item.type === "category") {
      docData = { type: item.type, name: item.name, imageUrl: item.imageUrl };
    } else {
      docData = {
        type: item.type,
        name: item.name,
        price: priceInt,
        category: item.category,
      };
    }

    const promise = await databases
      .createDocument(
        process.env.APPWRITE_DATABASE_ID,
        // process.env.MENU_ID,
        req.params.menuId,
        ID.unique(),
        docData
      )
      .then(
        (response) => {
          console.log("success");
          return response.data;
        },
        (error) => {
          console.log("error");
          console.log(error);
          return error.message;
        }
      );

    var resMsg;
    item.type == "product"
      ? (resMsg = "Ürün başarıyla eklendi!")
      : (resMsg = "Kategori başarıyla eklendi!");
    res.status(201).json({
      status: "OK",
      // data: promise,
      data: promise,
      msg: resMsg,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = req.body;
    const priceInt = Number(item.price);
    const docId = req.params.itemId;

    if (item.name.length == "") {
      return res.status(500).json({
        msg: "İsim boş bırakılamaz!",
      });
    }

    if (item.type == "product" && !(item.price > 0)) {
      return res.status(500).json({
        msg: "Fiyat sıfırdan daha fazla bir sayı olmalıdır!",
      });
    }

    var docData;
    if (item.type === "category") {
      docData = { type: item.type, name: item.name, imageUrl: item.imageUrl };
    } else {
      docData = {
        type: item.type,
        name: item.name,
        price: priceInt,
        category: item.category,
      };
    }

    const promise = await databases
      .updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        // process.env.MENU_ID,
        req.params.menuId,
        docId,
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

    var resMsg;
    item.type == "product"
      ? (resMsg = "Ürün başarıyla güncellendi!")
      : (resMsg = "Kategori başarıyla güncellendi!");
    res.status(201).json({
      status: "OK",
      // data: promise,
      data: promise,
      msg: resMsg,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const docId = req.params.itemId;

    const promise = await databases
      .deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        // process.env.MENU_ID,
        req.params.menuId,
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

    var resMsg;
    resMsg = "Silme işlemi başarılı!";
    res.status(201).json({
      status: "OK",
      data: promise,
      msg: resMsg,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
